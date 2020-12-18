#include "ColorizeNode.h"

NAN_MODULE_INIT(ColorizeNode::Init) {
	Nan::SetMethod(target, "colorize", ColorizeImage);
}

class ColorizeAsync : public Nan::AsyncWorker {
public:
	std::string img;
	std::string result;
	std::string lut;
	int sizeX;
	int sizeY;

	ColorizeAsync(std::string img, std::string lut, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->img = img;
		this->lut = lut;
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
		cv::Mat dst;
		cv::Mat img = strToMat(this->img);
		cv::Mat lut = strToMat(this->lut);
		Colorize cl;
		cv::Mat dstCol = cl.colorize(img, lut);
		ImagemConverter* c = new ImagemConverter();
		this->result = c->mat2str(dstCol);
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

NAN_METHOD(ColorizeNode::ColorizeImage) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("Image must be a string").ToLocalChecked());
	}
	if (!info[1]->IsString()) {
		return Nan::ThrowError(Nan::New("Lut must be a string").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeX").ToLocalChecked());
	}
	if (!info[3]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeY").ToLocalChecked());
	}
	if (!info[4]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Enter a callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new ColorizeAsync(
		std::string(*Nan::Utf8String(info[0]->ToString())),
		std::string(*Nan::Utf8String(info[1]->ToString())),
		info[2]->Int32Value(),
		info[3]->Int32Value(),
		new Nan::Callback(info[4].As<v8::Function>())
		));
}