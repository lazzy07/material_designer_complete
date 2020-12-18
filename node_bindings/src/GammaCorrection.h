#pragma once
#include <opencv2\imgproc.hpp>

class GammaCorrection {
public:
	cv::Mat gammaCorretion(cv::Mat img, float gamma);
};