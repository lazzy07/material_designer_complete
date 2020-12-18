#pragma once
#include <opencv2\imgproc.hpp>

class Threshold {
public:
	cv::Mat threshold(cv::Mat img, int threshVal, int maxVal, int threshType, int kernel, float substract);
};