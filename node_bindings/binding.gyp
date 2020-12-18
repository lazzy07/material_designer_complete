{
    "targets": [
        {
            "target_name": "mat-img-processing",
            "sources": ["./src/improc.cpp"],
            "include_dirs": ["<!(node -e \"require('nan')\")"],
            "libs": ["C:/opencv/opencv/build/include"]
        }
    ]
}
