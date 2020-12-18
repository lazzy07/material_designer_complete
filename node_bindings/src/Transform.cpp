#include "Transform.h"

cv::Mat Transform::transform(cv::Mat img, float sizeX, float sizeY, float rotation, float posX, float posY)
{
	cv::Mat dst, rotated, resized;
	//Rotation
	cv::Point2f pt(img.cols / 2., img.rows / 2.);
	cv::Mat r = cv::getRotationMatrix2D(pt, rotation, 1.0);
	cv::warpAffine(img, rotated, r, cv::Size(img.cols, img.rows), 1, cv::BORDER_WRAP);

	cv::resize(rotated, resized, img.size(), sizeX, sizeY);
	return dst;
}
