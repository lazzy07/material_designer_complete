#include "PerlinNoiseNode.h"

NAN_MODULE_INIT(PerlinNoiseNode::Init) {
	Nan::SetMethod(target, "perlinNoise", GeneratePerlinNoise);
}

class PerlinNoiseNodeAsync : public Nan::AsyncWorker {
public:
	int seed;
	int sizeX;
	int sizeY;
	int octaves;
	float bias;
	std::string imageStr;

	PerlinNoiseNodeAsync(int seed, int sizeX, int sizeY, int octaves, float bias, Nan::Callback *callback): Nan::AsyncWorker(callback) {
		this->seed = seed;
		this->sizeX = sizeX;
		this->sizeY = sizeY;
		this->octaves = octaves;
		this->bias = bias;
	}

	void Execute() {
		PerlinNoise pn;
		cv::Mat a = pn.perlinNoise(this->seed, this->sizeX, this->sizeY, this->octaves, this->bias);
		cv::Mat img;
		cv::Mat scaled;

		a.convertTo(scaled, CV_8UC1, 255, 0);
		cv::cvtColor(scaled, img, cv::COLOR_GRAY2RGB);

		ImagemConverter* m = new ImagemConverter();
		this->imageStr = m->mat2str(img);

		//Release memory
		img.release();
		scaled.release();
		delete[] a.data;
	}

	void HandleOKCallback() {
		Nan::HandleScope scope;
		v8::Local<v8::Value> argv[] = {
			Nan::Null(), //Error : no error
			Nan::New(this->imageStr).ToLocalChecked()
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

NAN_METHOD(PerlinNoiseNode::GeneratePerlinNoise) {
	if (!info[0]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Seed value must be an integer").ToLocalChecked());
	}
	if (!info[1]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Size x must be an integer").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Size y must be an integer").ToLocalChecked());
	}
	if (!info[3]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Octave must be an integer").ToLocalChecked());
	}
	if (!info[4]->IsNumber()) {
		return Nan::ThrowError(Nan::New("Bias must be an integer").ToLocalChecked());
	}
	if (!info[5]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Please enter a function callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new PerlinNoiseNodeAsync(
		info[0]->Int32Value(),
		info[1]->Int32Value(),
		info[2]->Int32Value(),
		info[3]->Int32Value(),
		info[4]->NumberValue(),
		new Nan::Callback(info[5].As<v8::Function>())
	));
}