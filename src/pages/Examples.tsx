import React from "react";
import { Link } from "react-router-dom";

const Examples: React.FC = () => {
  const examples = [
    {
      id: "basic-form",
      title: "기본 폼",
      description:
        "React Hook Form의 기본적인 사용법을 보여주는 간단한 폼 예제",
      path: "/examples/basic-form",
    },
    {
      id: "validation",
      title: "유효성 검사",
      description: "다양한 유효성 검사 규칙과 에러 메시지 처리 방법",
      path: "/examples/validation",
    },
    {
      id: "dynamic-fields",
      title: "동적 필드",
      description: "필드를 동적으로 추가하고 제거하는 방법",
      path: "/examples/dynamic-fields",
    },
    {
      id: "file-upload",
      title: "파일 업로드",
      description: "파일 선택 및 업로드 처리 방법",
      path: "/examples/file-upload",
    },
    {
      id: "custom-components",
      title: "커스텀 컴포넌트",
      description: "재사용 가능한 커스텀 폼 컴포넌트 만들기",
      path: "/examples/custom-components",
    },
    {
      id: "conditional-fields",
      title: "조건부 필드",
      description: "조건에 따라 필드를 표시하거나 숨기는 방법",
      path: "/examples/conditional-fields",
    },
    {
      id: "array-fields",
      title: "배열 필드",
      description: "동적 배열 필드 관리 방법",
      path: "/examples/array-fields",
    },
    {
      id: "nested-objects",
      title: "중첩 객체",
      description: "복잡한 중첩 객체 구조 관리 방법",
      path: "/examples/nested-objects",
    },
  ];

  return (
    <div className="page">
      <h1>React Hook Form 예제 모음</h1>
      <p className="page-description">
        React Hook Form의 다양한 사용법과 Best Practice를 보여주는 예제들입니다.
        각 예제를 클릭하여 상세 내용을 확인해보세요.
      </p>

      <div className="examples-grid">
        {examples.map((example) => (
          <div key={example.id} className="example-card">
            <h3>{example.title}</h3>
            <p>{example.description}</p>
            <Link to={example.path} className="example-link">
              예제 보기 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
