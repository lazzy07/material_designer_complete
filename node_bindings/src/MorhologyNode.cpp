#include "MorphologyNode.h"

NAN_MODULE_INIT(MorphologyNode::Init) {
	Nan::SetMethod(target, "morphologyOp", MorphologyImage);
}

class MorphologyAsync : public Nan::AsyncWorker {
public:
	std::string img;
	std::string result;
	int sizeX;
	int sizeY;
	int operation; 
	int kernel;
	int morph_size;
	int iterations;

	MorphologyAsync(std::string img, int operation, int kernel, int morph_size, int iterations, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->img = img;
		this->operation = operation;
		this->kernel = kernel;
		this->morph_size = morph_size;
		this->iterations = iterations;
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
		cv::Mat imgSrc = strToMat(this->img);
		Morphology m;
		dst = m.morphology(imgSrc, this->operation, this->kernel, this->morph_size, this->iterations);
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

NAN_METHOD(MorphologyNode::MorphologyImage) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("Image must be a string").ToLocalChecked());
	}
	if (!info[1]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter operation").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter kernel").ToLocalChecked());
	}
	if (!info[3]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter morph size").ToLocalChecked());
	}
	if (!info[4]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter iterations").ToLocalChecked());
	}
	if (!info[5]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeX").ToLocalChecked());
	}
	if (!info[6]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeY").ToLocalChecked());
	}
	if (!info[7]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Enter a callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new MorphologyAsync(
		std::string(*Nan::Utf8String(info[0]->ToString())),
		info[1]->Int32Value(),
		info[2]->Int32Value(),
		info[3]->Int32Value(),
		info[4]->Int32Value(),
		info[5]->Int32Value(),
		info[6]->Int32Value(),
		new Nan::Callback(info[7].As<v8::Function>())
	));
}