#include "BlurNode.h"

NAN_MODULE_INIT(BlurNode::Init) {
	Nan::SetMethod(target, "blur", BlurImage);
}

class BlurNodeAsync : public Nan::AsyncWorker {
public:
	std::string img;
	std::string result;
	int blurType;
	int ksizeX;
	int ksizeY;
	float sigmaX;
	float sigmaY;
	int sizeX;
	int sizeY;
	
	BlurNodeAsync(std::string img, int blurType, int ksizeX, int ksizeY, float sigmaX, float sigmaY, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->img = img;
		this->blurType = blurType;
		this->ksizeX = ksizeX;
		this->ksizeY = ksizeY;
		this->sigmaX = sigmaX;
		this->sigmaY = sigmaY;
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
		cv::Mat img = strToMat(this->img);
		Blur b;
		cv::Mat res;
		res = b.blur(img, this->blurType, this->ksizeX, this->ksizeY, this->sigmaX, this->sigmaY);
		cv::Mat res2;
		ImagemConverter* c = new ImagemConverter();
		this->result = c->mat2str(res);
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

NAN_METHOD(BlurNode::BlurImage) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("Image must be a string").ToLocalChecked());
	}
	if (!info[1]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter blur type").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter ksizeX").ToLocalChecked());
	}
	if (!info[3]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter ksizeY").ToLocalChecked());
	}
	if (!info[4]->IsNumber()) {
		return Nan::ThrowError(Nan::New("sigmaX must be a number").ToLocalChecked());
	}
	if (!info[5]->IsNumber()) {
		return Nan::ThrowError(Nan::New("sigmaY must be a number").ToLocalChecked());
	}
	if (!info[6]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeX").ToLocalChecked());
	}
	if (!info[7]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeY").ToLocalChecked());
	}
	if (!info[8]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Enter a callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new BlurNodeAsync(
		std::string(*Nan::Utf8String(info[0]->ToString())),
		info[1]->Int32Value(),
		info[2]->Int32Value(),
		info[3]->Int32Value(),
		info[4]->NumberValue(),
		info[5]->NumberValue(),
		info[6]->Int32Value(),
		info[7]->Int32Value(),
		new Nan::Callback(info[8].As<v8::Function>())
		));
}
