#pragma once
#include <opencv2\imgproc.hpp>

class Transform {
public:
	cv::Mat transform(cv::Mat img, float sizeX, float sizeY, float rotation, float posX, float posY);
};