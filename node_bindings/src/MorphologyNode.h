#pragma once
#include "Morphology.h"
#include <nan.h>
#include <thread>
#include "ConvertImage.h"
#include <opencv2\imgproc.hpp>

class MorphologyNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(MorphologyImage);
};