#include "InvertNode.h"

NAN_MODULE_INIT(InvertNode::Init) {
	Nan::SetMethod(target, "invert", InvertImage);
}

class InvertImageAsync : public Nan::AsyncWorker {
public:
	std::string img;
	std::string result;
	int sizeX;
	int sizeY;

	InvertImageAsync(std::string img, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
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
		cv::Mat imgSrc = strToMat(this->img);
		cv::Mat dst;
		cv::bitwise_not(imgSrc, dst);
		ImagemConverter* c = new ImagemConverter();
		this->result = c->mat2str(dst);
	}

	void HandleOKCallback() {
		Nan::HandleScope scope;
		v8::Local<v8::Value> argv[] = {
			Nan::Null(), //Error : no error
			Nan::New(this->result).ToLocalChecked()
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

NAN_METHOD(InvertNode::InvertImage) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("Image must be a string").ToLocalChecked());
	}
	if (!info[1]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeX").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeY").ToLocalChecked());
	}
	if (!info[3]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Enter a callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new InvertImageAsync(
		std::string(*Nan::Utf8String(info[0]->ToString())),
		info[1]->Int32Value(),
		info[2]->Int32Value(),
		new Nan::Callback(info[3].As<v8::Function>())
		));
}