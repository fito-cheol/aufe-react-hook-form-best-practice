import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import CodeExample from "../../components/CodeExample";
import { dynamicFieldsExamples } from "../../data/codeExamples";

interface FormData {
  name: string;
  email: string;
  hobbies: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: number;
  }>;
}

const DynamicFields: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      hobbies: [{ id: "1", name: "", description: "" }],
      skills: [{ id: "1", name: "", level: 1 }],
    },
  });

  const {
    fields: hobbyFields,
    append: appendHobby,
    remove: removeHobby,
  } = useFieldArray({
    control,
    name: "hobbies",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data: FormData) => {
    console.log("동적 필드 데이터:", data);
    alert("동적 필드가 성공적으로 제출되었습니다!\n콘솔을 확인해보세요.");
  };

  return (
    <div className="page">
      <h1>동적 필드 예제</h1>
      <p className="page-description">
        <code>useFieldArray</code>를 사용하여 필드를 동적으로 추가하고 제거하는
        예제입니다. 사용자가 원하는 만큼 필드를 추가할 수 있습니다.
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
                name: "철수 김",
                email: "test@example.com",
                hobbies: [
                  {
                    id: "1",
                    name: "등산",
                    description: "주말마다 가끔 등산을 합니다",
                  },
                  {
                    id: "2",
                    name: "요리",
                    description: "파스타와 한식을 즐겨 요리합니다",
                  },
                ],
                skills: [
                  { id: "1", name: "React", level: 4 },
                  { id: "2", name: "TypeScript", level: 3 },
                ],
              })
            }
          >
            예시 채우기
          </button>
        </div>
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
            <div className="section-header">
              <h3>취미</h3>
              <button
                type="button"
                onClick={() =>
                  appendHobby({
                    id: Date.now().toString(),
                    name: "",
                    description: "",
                  })
                }
                className="btn btn-add"
              >
                취미 추가
              </button>
            </div>

            {hobbyFields.map((field, index) => (
              <div key={field.id} className="dynamic-field-group">
                <div className="dynamic-field-header">
                  <h4>취미 {index + 1}</h4>
                  {hobbyFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHobby(index)}
                      className="btn btn-remove"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor={`hobbies.${index}.name`}>취미 이름</label>
                  <input
                    {...register(`hobbies.${index}.name` as const, {
                      required: "취미 이름을 입력해주세요",
                    })}
                    className={errors.hobbies?.[index]?.name ? "error" : ""}
                  />
                  {errors.hobbies?.[index]?.name && (
                    <span className="error-message">
                      {errors.hobbies[index]?.name?.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor={`hobbies.${index}.description`}>설명</label>
                  <textarea
                    {...register(`hobbies.${index}.description` as const)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>기술 스택</h3>
              <button
                type="button"
                onClick={() =>
                  appendSkill({ id: Date.now().toString(), name: "", level: 1 })
                }
                className="btn btn-add"
              >
                기술 추가
              </button>
            </div>

            {skillFields.map((field, index) => (
              <div key={field.id} className="dynamic-field-group">
                <div className="dynamic-field-header">
                  <h4>기술 {index + 1}</h4>
                  {skillFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="btn btn-remove"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor={`skills.${index}.name`}>기술 이름</label>
                  <input
                    {...register(`skills.${index}.name` as const, {
                      required: "기술 이름을 입력해주세요",
                    })}
                    className={errors.skills?.[index]?.name ? "error" : ""}
                  />
                  {errors.skills?.[index]?.name && (
                    <span className="error-message">
                      {errors.skills[index]?.name?.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor={`skills.${index}.level`}>숙련도 (1-5)</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    {...register(`skills.${index}.level` as const, {
                      valueAsNumber: true,
                    })}
                    className="range-input"
                  />
                  <div className="range-labels">
                    <span>초급</span>
                    <span>중급</span>
                    <span>고급</span>
                  </div>
                </div>
              </div>
            ))}
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
            <code>useFieldArray</code> 훅으로 동적 배열 필드 관리
          </li>
          <li>
            <code>append</code> 함수로 새 필드 추가
          </li>
          <li>
            <code>remove</code> 함수로 필드 제거
          </li>
          <li>
            <code>fields</code> 배열로 현재 필드들 순회
          </li>
          <li>중첩된 유효성 검사와 에러 처리</li>
        </ul>

        <h3>코드 예시</h3>
        {dynamicFieldsExamples.map((example, index) => (
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

export default DynamicFields;
