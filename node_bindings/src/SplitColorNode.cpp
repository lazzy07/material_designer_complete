#include "SplitColorNode.h"

NAN_MODULE_INIT(SplitColorNode::Init) {
	Nan::SetMethod(target, "splitColor", SplitColors);
}

class MyAsyncWorker : public Nan::AsyncWorker {
public:
	std::string img;
	int sizeX;
	int sizeY;
	std::string r;
	std::string g;
	std::string b;
	int type;
	float alpha;

	MyAsyncWorker(std::string img,int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->img = img;
		this->sizeX = sizeX;
		this->sizeY = sizeY;
	}

	cv::Mat strToMat(std::string img) {
		if (img != "") {
			ImagemConverter* c = new ImagemConverter();
			return c->str2mat(img);
		}
		else {
			Mat image(this->sizeX, this->sizeY, CV_8UC3, Scalar(0, 0, 0));
			return image;
		}
	}

	void Execute() {
		cv::Mat arr[3];
		SplitColor sc;
		cv::Mat img = strToMat(this->img);
		sc.splitColor(img, arr);
		cv::Mat bb, gg, rr;
		cv::cvtColor(arr[0], bb, cv::COLOR_GRAY2BGR);
		cv::cvtColor(arr[1], gg, cv::COLOR_GRAY2BGR);
		cv::cvtColor(arr[2], rr, cv::COLOR_GRAY2BGR);
		ImagemConverter* con = new ImagemConverter();
		this->b = con->mat2str(bb);
		this->g = con->mat2str(gg);
		this->r = con->mat2str(rr);
	}

	void HandleOKCallback() {
		Nan::HandleScope scope;
		v8::Local<v8::Value> argv[] = {
			Nan::Null(), //Error : no error
			Nan::New(this->r).ToLocalChecked(),
			Nan::New(this->g).ToLocalChecked(),
			Nan::New(this->b).ToLocalChecked(),
		};
		Nan::Call(callback->GetFunction(), Nan::GetCurrentContext()->Global(), 4, argv);
	}

	void HandleErrorCallback() {
		Nan::HandleScope scope;
		v8::Local<v8::Value> argv[] = {
			Nan::New(this->ErrorMessage()).ToLocalChecked(), // return error message
			Nan::Null(),
			Nan::Null(),
			Nan::Null()
		};
		Nan::Call(callback->GetFunction(), Nan::GetCurrentContext()->Global(), 4, argv);
	}
};

NAN_METHOD(SplitColorNode::SplitColors) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("Image must be a string or null").ToLocalChecked());
	}
	if (!info[1]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter a type of calculation").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeX").ToLocalChecked());
	}
	if (!info[3]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Enter a callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new MyAsyncWorker(
		std::string(*Nan::Utf8String(info[0]->ToString())),
		info[1]->Int32Value(),
		info[2]->Int32Value(),
		new Nan::Callback(info[3].As<v8::Function>())
	));
}