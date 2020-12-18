#include "DistanceTransformNode.h"

NAN_MODULE_INIT(DistanceTransformNode::Init) {
	Nan::SetMethod(target, "distanceTransform", DistanceTransformImage);
}

class DistanceTransformAsync : public Nan::AsyncWorker {
public:
	std::string img;
	std::string result;
	int retType;
	int distanceType;
	int maskSize;
	int labelType;
	int sizeX;
	int sizeY;

	DistanceTransformAsync(std::string img, int retType, int distanceType, int maskSize, int labelType, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->img = img;
		this->retType = retType;
		this->distanceType = distanceType;
		this->maskSize = maskSize;
		this->labelType = labelType;
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
		DistanceTransform dt;
		dst = dt.distanceTransform(img, this->retType, this->distanceType, this->maskSize, this->labelType);
		cv::Mat dstCol; 
		cv::cvtColor(dst, dstCol, cv::COLOR_GRAY2BGR);
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

NAN_METHOD(DistanceTransformNode::DistanceTransformImage) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("Image must be a string").ToLocalChecked());
	}
	if (!info[1]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter return type").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter distance type").ToLocalChecked());
	}
	if (!info[3]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter mask size").ToLocalChecked());
	}
	if (!info[4]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter label type").ToLocalChecked());
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

	Nan::AsyncQueueWorker(new DistanceTransformAsync(
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