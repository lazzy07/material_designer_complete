#include "RandomNoiseNode.h"

NAN_MODULE_INIT(RandomNoiseNode::Init) {
	Nan::SetMethod(target, "randomNoise", RandomNoise);
}

class RandomNoiseNodeAsync : public Nan::AsyncWorker {
public:
	int seed;
	int sizeX;
	int sizeY;
	std::string imgStr;


	RandomNoiseNodeAsync(int seed, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->seed = seed;
		this->sizeX = sizeX;
		this->sizeY = sizeY;
	}

	void Execute() {
		RandomNoise rn;
		cv::Mat a = rn.generate16bitRandomNoise(seed, sizeX, sizeY);
		
		cv::Mat img;
		cv::Mat scaled;
		
		a.convertTo(scaled, CV_8UC1, 255, 0);
		cv::cvtColor(scaled, img, cv::COLOR_GRAY2RGB);
		ImagemConverter* imConv = new ImagemConverter();
		
		
		this->imgStr = imConv->mat2str(img);
		
		//Free memory
		img.release();
		scaled.release();
		delete[] a.data;
	}

	void HandleOKCallback() {
		Nan::HandleScope scope;
		v8::Local<v8::Value> argv[] = {
			Nan::Null(), //Error : no error
			Nan::New(this->imgStr).ToLocalChecked()
		};
		Nan::Call(callback->GetFunction(), Nan::GetCurrentContext()->Global(), 2, argv);
	}

	void HandleErrorCallback() {
		Nan::HandleScope scope;
		v8::Local<v8::Value> argv[] = {
			Nan::New(this->ErrorMessage()).ToLocalChecked(), // return error message
			Nan::Null()
		};
		Nan::Call(callback->GetFunction(), Nan::GetCurrentContext()->Global(), 2, argv);
		
	}
};

NAN_METHOD(RandomNoiseNode::RandomNoise) {
	if (!info[0]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Please enter an int as seed").ToLocalChecked());
	}
	if (!info[1]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Please enter an integer as sizeX").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Please enter an integer as sizeY").ToLocalChecked());
	}
	if (!info[3]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Please enter a function callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new RandomNoiseNodeAsync(
		info[0]->Int32Value(),
		info[1]->Int32Value(),
		info[2]->Int32Value(),
		new Nan::Callback(info[3].As<v8::Function>())
		));
}
