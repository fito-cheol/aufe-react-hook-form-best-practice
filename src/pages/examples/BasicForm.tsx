import React from "react";
import { useForm } from "react-hook-form";
import CodeExample from "../../components/CodeExample";
import { basicFormExamples } from "../../data/codeExamples";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  bio: string;
}

const BasicForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("폼 데이터:", data);
    alert("폼이 성공적으로 제출되었습니다!\n콘솔을 확인해보세요.");
  };

  return (
    <div className="page">
      <h1>기본 폼 예제</h1>
      <p className="page-description">
        React Hook Form의 가장 기본적인 사용법을 보여주는 예제입니다.
        <code>useForm</code> 훅을 사용하여 폼 상태를 관리하고,
        <code>register</code> 함수로 입력 필드를 등록합니다.
      </p>

      <div className="form-container">
        <div
          className="form-actions"
          style={{
            justifyContent: "flex-end",
            paddingTop: 0,
            marginTop: 0,
            borderTop: "none",
          }}
        >
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              reset({
                firstName: "철수",
                lastName: "김",
                email: "test@example.com",
                age: 28,
                bio: "안녕하세요. React Hook Form 예시 데이터를 자동으로 채웠습니다.",
              })
            }
          >
            예시 채우기
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-group">
            <label htmlFor="firstName">이름</label>
            <input
              id="firstName"
              type="text"
              {...register("firstName", { required: "이름을 입력해주세요" })}
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">성</label>
            <input
              id="lastName"
              type="text"
              {...register("lastName", { required: "성을 입력해주세요" })}
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "올바른 이메일 형식을 입력해주세요",
                },
              })}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="age">나이</label>
            <input
              id="age"
              type="number"
              {...register("age", {
                required: "나이를 입력해주세요",
                min: { value: 1, message: "나이는 1 이상이어야 합니다" },
                max: { value: 120, message: "나이는 120 이하여야 합니다" },
              })}
              className={errors.age ? "error" : ""}
            />
            {errors.age && (
              <span className="error-message">{errors.age.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio">자기소개</label>
            <textarea
              id="bio"
              rows={4}
              {...register("bio", {
                maxLength: {
                  value: 500,
                  message: "자기소개는 500자 이하여야 합니다",
                },
              })}
              className={errors.bio ? "error" : ""}
            />
            {errors.bio && (
              <span className="error-message">{errors.bio.message}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              제출
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
            <code>useForm</code> 훅으로 폼 상태 관리
          </li>
          <li>
            <code>register</code> 함수로 입력 필드 등록
          </li>
          <li>
            <code>handleSubmit</code>으로 폼 제출 처리
          </li>
          <li>
            <code>formState.errors</code>로 에러 상태 접근
          </li>
          <li>
            <code>reset</code> 함수로 폼 초기화
          </li>
        </ul>
        
        <h3>코드 예시</h3>
        {basicFormExamples.map((example, index) => (
          <CodeExample
            key={index}
            title={example.title}
            description={example.description}
            code={example.code}
          />
        ))}
      </div>
    </div>
  );
};

export default BasicForm;
