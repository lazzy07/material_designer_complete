#pragma once
#include <nan.h>
#include <thread>
#include "ConvertImage.h"
#include <opencv2\imgproc.hpp>

class InvertNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(InvertImage);
};
