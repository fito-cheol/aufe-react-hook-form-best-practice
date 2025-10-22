import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CodeExample from "../../components/CodeExample";
import { validationExamples } from "../../data/codeExamples";

// Zod 스키마 정의
const schema = z
  .object({
    username: z
      .string()
      .min(3, "사용자명은 최소 3자 이상이어야 합니다")
      .max(20, "사용자명은 최대 20자까지 가능합니다")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다"
      ),
    email: z.string().email("올바른 이메일 형식을 입력해주세요"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다"
      ),
    confirmPassword: z.string(),
    phone: z
      .string()
      .regex(
        /^010-\d{4}-\d{4}$/,
        "올바른 전화번호 형식을 입력해주세요 (010-0000-0000)"
      ),
    website: z
      .string()
      .url("올바른 URL 형식을 입력해주세요")
      .optional()
      .or(z.literal("")),
    age: z
      .number()
      .min(18, "나이는 18세 이상이어야 합니다")
      .max(100, "나이는 100세 이하여야 합니다"),
    terms: z.boolean().refine((val) => val === true, "약관에 동의해야 합니다"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const Validation: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      website: "",
      age: 18,
      terms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    // 실제 API 호출을 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("유효성 검사 통과한 데이터:", data);
    alert("모든 유효성 검사를 통과했습니다!\n콘솔을 확인해보세요.");
  };

  return (
    <div className="page">
      <h1>유효성 검사 예제</h1>
      <p className="page-description">
        Zod 스키마를 사용한 강력한 유효성 검사 예제입니다. 다양한 유효성 검사
        규칙과 에러 메시지를 보여줍니다.
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
                username: "test_user",
                email: "test@example.com",
                password: "Aa!23456",
                confirmPassword: "Aa!23456",
                phone: "010-1234-5678",
                website: "https://example.com",
                age: 25,
                terms: true,
              })
            }
          >
            예시 채우기
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-group">
            <label htmlFor="username">사용자명</label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className={errors.username ? "error" : ""}
              placeholder="영문, 숫자, 언더스코어만 사용 (3-20자)"
            />
            {errors.username && (
              <span className="error-message">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={errors.email ? "error" : ""}
              placeholder="example@email.com"
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={errors.password ? "error" : ""}
              placeholder="대문자, 소문자, 숫자, 특수문자 포함 8자 이상"
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "error" : ""}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            {errors.confirmPassword && (
              <span className="error-message">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className={errors.phone ? "error" : ""}
              placeholder="010-0000-0000"
            />
            {errors.phone && (
              <span className="error-message">{errors.phone.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="website">웹사이트 (선택사항)</label>
            <input
              id="website"
              type="url"
              {...register("website")}
              className={errors.website ? "error" : ""}
              placeholder="https://example.com"
            />
            {errors.website && (
              <span className="error-message">{errors.website.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="age">나이</label>
            <input
              id="age"
              type="number"
              {...register("age", { valueAsNumber: true })}
              className={errors.age ? "error" : ""}
              min="18"
              max="100"
            />
            {errors.age && (
              <span className="error-message">{errors.age.message}</span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register("terms")}
                className={errors.terms ? "error" : ""}
              />
              <span>이용약관에 동의합니다</span>
            </label>
            {errors.terms && (
              <span className="error-message">{errors.terms.message}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "제출"}
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
            <code>Zod</code> 스키마를 사용한 강력한 유효성 검사
          </li>
          <li>
            <code>zodResolver</code>로 React Hook Form과 Zod 연동
          </li>
          <li>정규식을 사용한 복잡한 유효성 검사 규칙</li>
          <li>
            <code>refine</code>을 사용한 커스텀 유효성 검사
          </li>
          <li>
            <code>isSubmitting</code> 상태로 제출 중 UI 처리
          </li>
        </ul>

        <h3>코드 예시</h3>
        {validationExamples.map((example, index) => (
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

export default Validation;
