#pragma once
#include "opencv2\imgproc.hpp"

class DistanceTransform {
public:
	cv::Mat distanceTransform(cv::Mat img, int retType, int distanceType, int maskSize, int labelType);
};