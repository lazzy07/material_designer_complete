#include "Morphology.h"

cv::Mat Morphology::morphology(cv::Mat img, int operation, int kernel, int morph_size, int iterations) {
	cv::Mat dst;
	if (morph_size < 1) {
		morph_size = 1;
	}
	cv::Mat element = cv::getStructuringElement(kernel, cv::Size(2 * morph_size + 1, 2 * morph_size + 1), cv::Point(morph_size, morph_size));

	operation = operation + 2;
	cv::morphologyEx(img, dst, operation, element, cv::Point(-1, -1), iterations);
	return dst;
}