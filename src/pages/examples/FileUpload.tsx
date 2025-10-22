import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  profileImage: FileList;
  documents: FileList;
  resume: FileList;
}

const FileUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    profileImage?: File;
    documents?: File[];
    resume?: File;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const profileImage = watch("profileImage");
  const documents = watch("documents");
  const resume = watch("resume");

  const onSubmit = (data: FormData) => {
    console.log("파일 업로드 데이터:", data);
    
    // 파일 정보 출력
    if (data.profileImage && data.profileImage.length > 0) {
      console.log("프로필 이미지:", data.profileImage[0]);
    }
    if (data.documents && data.documents.length > 0) {
      console.log("문서들:", Array.from(data.documents));
    }
    if (data.resume && data.resume.length > 0) {
      console.log("이력서:", data.resume[0]);
    }
    
    alert("파일이 성공적으로 업로드되었습니다!\n콘솔을 확인해보세요.");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="page">
      <h1>파일 업로드 예제</h1>
      <p className="page-description">
        React Hook Form을 사용한 파일 업로드 처리 예제입니다.
        다양한 파일 타입과 크기 제한을 보여줍니다.
      </p>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-section">
            <h3>기본 정보</h3>
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "이름을 입력해주세요" })}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "이메일을 입력해주세요" })}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>프로필 이미지</h3>
            <div className="form-group">
              <label htmlFor="profileImage">프로필 이미지</label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                {...register("profileImage", {
                  required: "프로필 이미지를 선택해주세요",
                  validate: {
                    fileSize: (files) => {
                      if (files && files.length > 0) {
                        const file = files[0];
                        return file.size <= 5 * 1024 * 1024 || "파일 크기는 5MB 이하여야 합니다";
                      }
                      return true;
                    },
                    fileType: (files) => {
                      if (files && files.length > 0) {
                        const file = files[0];
                        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
                        return allowedTypes.includes(file.type) || "JPEG, PNG, GIF, WebP 파일만 업로드 가능합니다";
                      }
                      return true;
                    },
                  },
                })}
                className={errors.profileImage ? "error" : ""}
              />
              {errors.profileImage && (
                <span className="error-message">{errors.profileImage.message}</span>
              )}
              
              {profileImage && profileImage.length > 0 && (
                <div className="file-preview">
                  <p>선택된 파일: {profileImage[0].name}</p>
                  <p>크기: {formatFileSize(profileImage[0].size)}</p>
                  <p>타입: {profileImage[0].type}</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>문서 업로드</h3>
            <div className="form-group">
              <label htmlFor="documents">문서들 (여러 파일 선택 가능)</label>
              <input
                id="documents"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                multiple
                {...register("documents", {
                  validate: {
                    fileCount: (files) => {
                      if (files && files.length > 0) {
                        return files.length <= 5 || "최대 5개 파일까지 업로드 가능합니다";
                      }
                      return true;
                    },
                    fileSize: (files) => {
                      if (files && files.length > 0) {
                        const maxSize = 10 * 1024 * 1024; // 10MB
                        for (let file of Array.from(files)) {
                          if (file.size > maxSize) {
                            return "각 파일의 크기는 10MB 이하여야 합니다";
                          }
                        }
                      }
                      return true;
                    },
                  },
                })}
                className={errors.documents ? "error" : ""}
              />
              {errors.documents && (
                <span className="error-message">{errors.documents.message}</span>
              )}
              
              {documents && documents.length > 0 && (
                <div className="file-preview">
                  <h4>선택된 문서들:</h4>
                  {Array.from(documents).map((file, index) => (
                    <div key={index} className="file-item">
                      <p>파일 {index + 1}: {file.name}</p>
                      <p>크기: {formatFileSize(file.size)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>이력서</h3>
            <div className="form-group">
              <label htmlFor="resume">이력서 (PDF만)</label>
              <input
                id="resume"
                type="file"
                accept=".pdf"
                {...register("resume", {
                  validate: {
                    fileType: (files) => {
                      if (files && files.length > 0) {
                        const file = files[0];
                        return file.type === "application/pdf" || "PDF 파일만 업로드 가능합니다";
                      }
                      return true;
                    },
                    fileSize: (files) => {
                      if (files && files.length > 0) {
                        const file = files[0];
                        return file.size <= 20 * 1024 * 1024 || "파일 크기는 20MB 이하여야 합니다";
                      }
                      return true;
                    },
                  },
                })}
                className={errors.resume ? "error" : ""}
              />
              {errors.resume && (
                <span className="error-message">{errors.resume.message}</span>
              )}
              
              {resume && resume.length > 0 && (
                <div className="file-preview">
                  <p>선택된 파일: {resume[0].name}</p>
                  <p>크기: {formatFileSize(resume[0].size)}</p>
                  <p>타입: {resume[0].type}</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              업로드
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              초기화
            </button>
          </div>
        </form>
      </div>

      <div className="code-explanation">
        <h3>주요 포인트</h3>
        <ul>
          <li>
            <code>FileList</code> 타입으로 파일 배열 처리
          </li>
          <li>
            <code>accept</code> 속성으로 파일 타입 제한
          </li>
          <li>
            <code>multiple</code> 속성으로 다중 파일 선택
          </li>
          <li>
            <code>validate</code> 함수로 파일 크기 및 타입 검증
          </li>
          <li>
            <code>watch</code>로 실시간 파일 선택 상태 확인
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
