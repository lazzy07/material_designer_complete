#include "GammaCorrection.h"

using namespace cv;

cv::Mat GammaCorrection::gammaCorretion(cv::Mat img, float gamma)
{
	if (gamma == 0.0) {
		gamma = 1.0;
	}
	double inverse_gamma = 1.0 / gamma;
	Mat lut_matrix(1, 256, CV_8UC1);
	uchar * ptr = lut_matrix.ptr();
	for (int i = 0; i < 256; i++)
		ptr[i] = (int)(pow((double)i / 255.0, inverse_gamma) * 255.0);
	Mat result;
	LUT(img, lut_matrix, result);

	return result;
}



