#pragma once
#include <opencv2\imgproc.hpp>

class Blur {
public:
	cv::Mat blur(cv::Mat img, int type, int ksizeX, int ksizeY, float sigmaX, float sigmaY);
};