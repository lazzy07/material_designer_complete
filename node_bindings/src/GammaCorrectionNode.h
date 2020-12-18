#pragma once
#include "GammaCorrection.h"
#include <nan.h>
#include <thread>
#include "ConvertImage.h"
#include <opencv2\imgproc.hpp>

class GammaCorrectionNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(GammaCorrectionImage);
};