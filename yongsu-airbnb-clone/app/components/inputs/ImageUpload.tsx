"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "qmliekjf";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full ">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="House"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;

// https://cloudinary.com/

// Cloudinary의 "preset"은 이미지나 비디오와 같은 미디어 자산을 처리하고 변환하는 데 사용되는 사전 구성 설정입니다. "Preset"은 Cloudinary 대시보드나 API를 통해 생성하고 정의할 수 있으며, 자주 사용되는 변환 및 처리 옵션을 미리 설정하여 간편하게 재사용할 수 있도록 도와줍니다.

// "Preset"의 사용 용도는 다음과 같습니다:
// 이미지 및 비디오 변환: "Preset"은 이미지나 비디오를 원하는 크기, 형식, 품질 등으로 변환하는 데 사용됩니다. 예를 들어, 이미지를 리사이징하거나 품질을 압축하는 등의 작업을 "Preset"에 사전에 정의하여 재사용할 수 있습니다.
// 필터 및 효과 적용: "Preset"은 이미지에 필터, 효과, 텍스트 오버레이 등을 적용하는 데 사용됩니다. 예를 들어, 이미지에 회전, 선명도 조정, 그라디언트 효과 등을 적용할 수 있습니다.
// 이미지 포맷 변환: "Preset"은 이미지를 다양한 형식으로 변환하는 데 사용됩니다. 예를 들어, JPEG, PNG, WebP 등의 포맷으로 이미지를 변환할 수 있습니다. 이를 통해 웹 페이지의 성능을 향상시킬 수 있습니다.
// 동영상 변환 및 재생: "Preset"은 비디오를 원하는 형식, 해상도, 비트레이트 등으로 변환하는 데 사용됩니다. 또한 비디오의 자르기, 자막 추가, 압축 등 다양한 처리 옵션을 "Preset"에 사전에 정의하여 사용할 수 있습니다.
// "Preset"은 일련의 변환 및 처리 옵션을 포함하는 템플릿으로 볼 수 있습니다. 미디어 자산을 Cloudinary에 업로드하고 처리할 때 자주 사용되는 옵션을 "Preset"으로 정의하면 반복적인 설정 작업을 줄이고 효율적으로 작업할 수 있습니다. 또한 "Preset"은 일관된 이미지 및 비디오 처리를 보장하여 개발자들에게 편의성을 제공합니다.

// Cloudinary의 Signing Mode 중 "Unsigned"는 서명 없이 URL을 생성하는 옵션입니다. 서명(signing)은 URL에 디지털 서명을 추가하여 인증하고 보안을 강화하는 기술입니다. 그러나 "Unsigned" 모드에서는 서명을 사용하지 않고 URL을 생성하므로 추가적인 서명 과정 없이 미디어 자산에 접근할 수 있습니다.
// "Unsigned" 모드를 사용하는 경우에는 다음과 같은 상황에서 유용할 수 있습니다:
// 퍼블릭 자산: 서명이 필요하지 않고 모든 사용자가 접근할 수 있는 퍼블릭 자산의 경우 "Unsigned" 모드를 사용할 수 있습니다. 예를 들어, 블로그 게시물의 이미지나 웹 페이지에서 공유되는 이미지 파일 등을 서명 없이 사용할 수 있습니다.
// 동적 URL 생성: 서명 없는 URL을 생성하여 동적으로 미디어 자산에 접근해야 하는 경우 "Unsigned" 모드를 사용할 수 있습니다. 이는 서명 과정을 거치지 않고도 빠르게 URL을 생성하고 사용할 수 있음을 의미합니다.
// 테스트 및 개발 환경: 개발 또는 테스트 중인 환경에서 서명 과정을 생략하고 간편하게 미디어 자산에 접근하고 테스트할 수 있습니다. 개발자나 QA 팀원들이 편리하게 미디어 자산을 사용하고 테스트할 수 있습니다.
// "Unsigned" 모드는 서명 과정을 생략하기 때문에 보안 측면에서는 주의가 필요합니다. 중요한 미디어 자산이나 유료 콘텐츠의 경우에는 서명을 사용하여 보안을 강화하는 것이 권장됩니다. 하지만 퍼블릭 자산이나 테스트/개발 환경에서는 편리함과 빠른 개발을 위해 "Unsigned" 모드를 사용할 수 있습니다.
