#pragma once
#include "Threshold.h"
#include <nan.h>
#include <thread>
#include "ConvertImage.h"

class ThresholdNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(ThresholdGray);
};