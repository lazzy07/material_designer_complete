#pragma once
#include "DistanceTransform.h"
#include <nan.h>
#include "ConvertImage.h"

class DistanceTransformNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(DistanceTransformImage);
};