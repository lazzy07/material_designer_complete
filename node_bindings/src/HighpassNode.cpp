#include "HighpassNode.h"

NAN_MODULE_INIT(HighpassNode::Init) {
	Nan::SetMethod(target, "highpass", HighpassImage);
}

class HighpassAsyncWorker : public Nan::AsyncWorker {
public:
	std::string img;
	std::string result;
	int type;
	int dx;
	int dy;
	int ksize;
	float delta;
	int sizeX;
	int sizeY;
	
	HighpassAsyncWorker(std::string img, int type, int dx, int dy, int ksize, float delta, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->img = img;
		this->type = type;
		this->dx = dx;
		this->dy = dy;
		this->ksize = ksize;
		this->delta = delta;
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
		Highpass h;

		cv::Mat dst = h.highpass(imgSrc, this->type, this->dx, this->dy, this->ksize, this->delta);

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

NAN_METHOD(HighpassNode::HighpassImage) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("Image must be a string").ToLocalChecked());
	}
	if (!info[1]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter highpass type").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter dx").ToLocalChecked());
	}
	if (!info[3]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter dy").ToLocalChecked());
	}
	if (!info[4]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter ksize").ToLocalChecked());
	}
	if (!info[5]->IsNumber()) {
		return Nan::ThrowError(Nan::New("Enter delta").ToLocalChecked());
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

	Nan::AsyncQueueWorker(new HighpassAsyncWorker(
		std::string(*Nan::Utf8String(info[0]->ToString())),
		info[1]->Int32Value(),
		info[2]->Int32Value(),
		info[3]->Int32Value(),
		info[4]->Int32Value(),
		info[5]->NumberValue(),
		info[6]->Int32Value(),
		info[7]->Int32Value(),
		new Nan::Callback(info[8].As<v8::Function>())
		));
}