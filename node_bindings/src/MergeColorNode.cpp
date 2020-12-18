#include "MergeColorNode.h"

NAN_MODULE_INIT(MergeColorNode::Init) {
	Nan::SetMethod(target, "mergeColor", MergeChannels);
}

class MyAysncWorker : public Nan::AsyncWorker {
public:
	std::string r;
	std::string g;
	std::string b;
	std::string result;
	int sizeX;
	int sizeY;

	MyAysncWorker(std::string r, std::string g, std::string b, int sizeX, int sizeY, Nan::Callback *callback) : Nan::AsyncWorker(callback) {
		this->r = r;
		this->g = g;
		this->b = b;
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
		std::vector<cv::Mat> channels;
		cv::Mat res;
		vector<Mat> rChannels(3);
		vector<Mat> gChannels(3);
		vector<Mat> bChannels(3);

		std::thread rt([&] {
			cv::Mat r3 = strToMat(this->r);
			cv::split(r3, rChannels);
			
		});
		std::thread gt([&] {
			cv::Mat g3 = strToMat(this->g);
			
			cv::split(g3, gChannels);
			
		});
		std::thread bt([&] {
			cv::Mat b3 = strToMat(this->b);
			cv::split(b3, bChannels);
		});
		rt.join();
		bt.join();
		gt.join();

		channels.push_back(bChannels[0]);
		channels.push_back(gChannels[1]);
		channels.push_back(rChannels[2]);

		cv::merge(channels, res);
		//cv::Mat dstCol;
		//cv::cvtColor(res, dstCol, cv::COLOR_GRAY2BGR);
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

NAN_METHOD(MergeColorNode::MergeChannels) {
	if (!info[0]->IsString()) {
		return Nan::ThrowError(Nan::New("R channel must be a string").ToLocalChecked());
	}
	if (!info[1]->IsString()) {
		return Nan::ThrowError(Nan::New("G Channel must be a string").ToLocalChecked());
	}
	if (!info[2]->IsString()) {
		return Nan::ThrowError(Nan::New("B channel must be a string").ToLocalChecked());
	}
	if (!info[3]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeX").ToLocalChecked());
	}
	if (!info[4]->IsInt32()) {
		return Nan::ThrowError(Nan::New("Enter sizeY").ToLocalChecked());
	}
	if (!info[5]->IsFunction()) {
		return Nan::ThrowError(Nan::New("Enter a callback").ToLocalChecked());
	}

	Nan::AsyncQueueWorker(new MyAysncWorker(
		std::string(*Nan::Utf8String(info[0]->ToString())),
		std::string(*Nan::Utf8String(info[1]->ToString())),
		std::string(*Nan::Utf8String(info[2]->ToString())),
		info[3]->Int32Value(),
		info[4]->Int32Value(),
		new Nan::Callback(info[5].As<v8::Function>())
		));
}