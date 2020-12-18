#include "Blur.h"

cv::Mat Blur::blur(cv::Mat img, int type, int ksizeX, int ksizeY, float sigmaX, float sigmaY)
{
	if (ksizeX < 3) {
		ksizeX = 3;
	}
	else {
		if (ksizeX % 2 == 0) {
			ksizeX = ksizeX - 1;
		}
	}

	if (ksizeY < 3) {
		ksizeY = 3;
	}
	else {
		if (ksizeY % 2 == 0) {
			ksizeY = ksizeY - 1;
		}
	}

	cv::Mat dst;

	if (type == 0) {
		cv::blur(img, dst, cv::Size(ksizeX, ksizeY));
		return dst;
	}
	if (type == 1) {
		cv::GaussianBlur(img, dst, cv::Size(ksizeX, ksizeY), sigmaX, sigmaY, cv::BORDER_WRAP);
		return dst;
	}
	if (type == 2) {
		cv::medianBlur(img, dst, ksizeX);
		return dst;
	}
}
