#pragma once
#include <opencv2\imgproc.hpp>

class Blend {
public:
	cv::Mat addImage(cv::Mat img1, cv::Mat img2, float alpha);
	cv::Mat substractImage(cv::Mat img1, cv::Mat img2, float alpha);
	cv::Mat multiplyImage(cv::Mat img1, cv::Mat img2, float alpha);
	cv::Mat divideImage(cv::Mat img1, cv::Mat img2, float alpha);
};