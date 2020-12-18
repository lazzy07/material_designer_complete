#include "Highpass.h"

cv::Mat Highpass::highpass(cv::Mat img, int type, int dx, int dy, int ksize, float delta)
{
	if (ksize < 1) {
		ksize = 1;
	}
	else {
		if (ksize % 2 == 0) {
			ksize = ksize - 1;
		}
	}

	if (dx < 0) {
		dx = 1;
	}
	if (dy < 0) {
		dy = 1;
	}

	if (dx == 0 && dy == 0) {
		dx = 1;
	}

	if (ksize > 31) {
		ksize = 31;
	}
	else if (ksize < 1) {
		ksize = 1;
	}

	int sigma = 3;

	cv::Mat dst, abs_dst, gray;
	cv::cvtColor(img, gray, cv::COLOR_BGR2GRAY);
	if (type == 0) {
		cv::Laplacian(img, dst, CV_16S, ksize, 1.0, delta, cv::BORDER_DEFAULT);
		cv::convertScaleAbs(dst, abs_dst);
	}
	else if (type == 1) {
		cv::Sobel(img, dst, CV_16S, dx, dy, ksize, 1.0, delta, 4);
		cv::convertScaleAbs(dst, abs_dst);
	}
	else {
		cv::Scharr(img, dst, CV_16S, dx, dy, 1.0, delta, 4);
		cv::convertScaleAbs(dst, abs_dst);
	}
	return abs_dst;
}
