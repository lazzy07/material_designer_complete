#pragma once
#include <opencv2\imgproc.hpp>

class Colorize {
public:
	cv::Mat colorize(cv::Mat image, cv::Mat lut);
};