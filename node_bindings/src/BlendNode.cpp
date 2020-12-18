#include "BlendNode.h"

NAN_MODULE_INIT(BlendNode::Init) {
	Nan::SetMethod(target, "imageArithmetic", Arithmetic);
}

class BlendNodeAsync : public Nan::AsyncWorker {
public:
	std::string img1;
	cv::Mat img1Mat;
	cv::Mat img2Mat;
	string result;
	int sizeX;
	int sizeY;
	std::string img2;
	int type;
	float alpha;

	BlendNodeAsync(std::string img1, std::string img2, int type, float alpha, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->img1 = img1;
		this->img2 = img2;
		this->type = type;
		this->alpha = alpha;
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
		cv::Mat img1Mat;
		std::thread img1t([&] {this->img1Mat = strToMat(this->img1);});
		std::thread img2t([&] {this->img2Mat = strToMat(this->img2);});
		img1t.join();
		img2t.join();

		cv::Mat res;
		Blend b;
		switch (this->type) {
		case 0:
			res = b.addImage(this->img1Mat, this->img2Mat, this->alpha);
			break;
		case 1:
			res = b.substractImage(this->img1Mat, this->img2Mat, this->alpha);
			break;
		case 2:
			res = b.multiplyImage(this->img1Mat, this->img2Mat, this->alpha);
			break;
		case 3:
			res = b.divideImage(this->img1Mat, this->img2Mat, this->alpha);
			break;
		}
		if (res.data == NULL ) {
			this->SetErrorMessage("Response cannot be processed");
		}
		else {
			ImagemConverter* m = new ImagemConverter();
			this->result = m->mat2str(res);
		}
		img1Mat.release();
		img2Mat.release();
		res.release();
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

NAN_METHOD(BlendNode::Arithmetic) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("Image 1 must be a string or null").ToLocalChecked());
	}
	if (!info[1]->IsString()) {
		return Nan::ThrowError(Nan::New("Image 1 must be a string or null").ToLocalChecked());
	}
	if (!info[3]->IsNumber()) {
		return Nan::ThrowError(Nan::New("Alpha must be a number").ToLocalChecked());
	}
	if (!info[2]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter a type of calculation").ToLocalChecked());
	}
	if (!info[4]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeX").ToLocalChecked());
	}
	if (!info[5]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeY").ToLocalChecked());
	}
	if (!info[6]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Enter a callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new BlendNodeAsync(
		std::string(*Nan::Utf8String(info[0]->ToString())),
		std::string(*Nan::Utf8String(info[1]->ToString())),
		info[2]->Int32Value(),
		info[3]->NumberValue(),
		info[4]->Int32Value(),
		info[5]->Int32Value(),
		new Nan::Callback(info[6].As<v8::Function>())
	));
}