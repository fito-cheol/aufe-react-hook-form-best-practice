import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  
  // 동적 배열 필드들
  addresses: Array<{
    id: string;
    type: "home" | "work" | "other";
    street: string;
    city: string;
    zipCode: string;
    country: string;
    isPrimary: boolean;
  }>;
  
  phoneNumbers: Array<{
    id: string;
    type: "mobile" | "home" | "work";
    number: string;
    isPrimary: boolean;
  }>;
  
  emergencyContacts: Array<{
    id: string;
    name: string;
    relationship: string;
    phone: string;
    email: string;
  }>;
  
  workExperience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string;
  }>;
  
  skills: Array<{
    id: string;
    name: string;
    level: number;
    category: string;
  }>;
}

const ArrayFields: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      addresses: [{ id: "1", type: "home", street: "", city: "", zipCode: "", country: "", isPrimary: true }],
      phoneNumbers: [{ id: "1", type: "mobile", number: "", isPrimary: true }],
      emergencyContacts: [{ id: "1", name: "", relationship: "", phone: "", email: "" }],
      workExperience: [{ id: "1", company: "", position: "", startDate: "", endDate: "", isCurrent: false, description: "" }],
      skills: [{ id: "1", name: "", level: 1, category: "" }],
    },
  });

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
    move: moveAddress,
  } = useFieldArray({
    control,
    name: "addresses",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "workExperience",
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
    console.log("배열 필드 데이터:", data);
    alert("배열 필드가 성공적으로 제출되었습니다!\n콘솔을 확인해보세요.");
  };

  const skillCategories = [
    { value: "frontend", label: "프론트엔드" },
    { value: "backend", label: "백엔드" },
    { value: "database", label: "데이터베이스" },
    { value: "devops", label: "DevOps" },
    { value: "mobile", label: "모바일" },
    { value: "other", label: "기타" },
  ];

  return (
    <div className="page">
      <h1>배열 필드 예제</h1>
      <p className="page-description">
        <code>useFieldArray</code>를 사용하여 동적 배열 필드를 관리하는 예제입니다.
        주소, 전화번호, 비상연락처, 경력, 기술 등 다양한 배열 필드를 다룹니다.
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
            <div className="section-header">
              <h3>주소</h3>
              <button
                type="button"
                onClick={() => appendAddress({ id: Date.now().toString(), type: "home", street: "", city: "", zipCode: "", country: "", isPrimary: false })}
                className="btn btn-add"
              >
                주소 추가
              </button>
            </div>
            
            {addressFields.map((field, index) => (
              <div key={field.id} className="array-field-group">
                <div className="array-field-header">
                  <h4>주소 {index + 1}</h4>
                  <div className="array-field-actions">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveAddress(index, index - 1)}
                        className="btn btn-move"
                      >
                        ↑
                      </button>
                    )}
                    {index < addressFields.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveAddress(index, index + 1)}
                        className="btn btn-move"
                      >
                        ↓
                      </button>
                    )}
                    {addressFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAddress(index)}
                        className="btn btn-remove"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>주소 타입</label>
                    <select {...register(`addresses.${index}.type` as const)}>
                      <option value="home">집</option>
                      <option value="work">직장</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        {...register(`addresses.${index}.isPrimary` as const)}
                      />
                      <span>기본 주소</span>
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>도로명 주소</label>
                  <input
                    {...register(`addresses.${index}.street` as const, {
                      required: "도로명 주소를 입력해주세요",
                    })}
                    className={errors.addresses?.[index]?.street ? "error" : ""}
                  />
                  {errors.addresses?.[index]?.street && (
                    <span className="error-message">
                      {errors.addresses[index]?.street?.message}
                    </span>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>도시</label>
                    <input
                      {...register(`addresses.${index}.city` as const, {
                        required: "도시를 입력해주세요",
                      })}
                      className={errors.addresses?.[index]?.city ? "error" : ""}
                    />
                    {errors.addresses?.[index]?.city && (
                      <span className="error-message">
                        {errors.addresses[index]?.city?.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>우편번호</label>
                    <input
                      {...register(`addresses.${index}.zipCode` as const, {
                        required: "우편번호를 입력해주세요",
                      })}
                      className={errors.addresses?.[index]?.zipCode ? "error" : ""}
                    />
                    {errors.addresses?.[index]?.zipCode && (
                      <span className="error-message">
                        {errors.addresses[index]?.zipCode?.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>국가</label>
                    <input
                      {...register(`addresses.${index}.country` as const, {
                        required: "국가를 입력해주세요",
                      })}
                      className={errors.addresses?.[index]?.country ? "error" : ""}
                    />
                    {errors.addresses?.[index]?.country && (
                      <span className="error-message">
                        {errors.addresses[index]?.country?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>전화번호</h3>
              <button
                type="button"
                onClick={() => appendPhone({ id: Date.now().toString(), type: "mobile", number: "", isPrimary: false })}
                className="btn btn-add"
              >
                전화번호 추가
              </button>
            </div>
            
            {phoneFields.map((field, index) => (
              <div key={field.id} className="array-field-group">
                <div className="array-field-header">
                  <h4>전화번호 {index + 1}</h4>
                  {phoneFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhone(index)}
                      className="btn btn-remove"
                    >
                      삭제
                    </button>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>전화번호 타입</label>
                    <select {...register(`phoneNumbers.${index}.type` as const)}>
                      <option value="mobile">휴대폰</option>
                      <option value="home">집</option>
                      <option value="work">직장</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        {...register(`phoneNumbers.${index}.isPrimary` as const)}
                      />
                      <span>기본 번호</span>
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>전화번호</label>
                  <input
                    {...register(`phoneNumbers.${index}.number` as const, {
                      required: "전화번호를 입력해주세요",
                      pattern: {
                        value: /^010-\d{4}-\d{4}$/,
                        message: "올바른 전화번호 형식을 입력해주세요 (010-0000-0000)",
                      },
                    })}
                    className={errors.phoneNumbers?.[index]?.number ? "error" : ""}
                    placeholder="010-0000-0000"
                  />
                  {errors.phoneNumbers?.[index]?.number && (
                    <span className="error-message">
                      {errors.phoneNumbers[index]?.number?.message}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>비상연락처</h3>
              <button
                type="button"
                onClick={() => appendContact({ id: Date.now().toString(), name: "", relationship: "", phone: "", email: "" })}
                className="btn btn-add"
              >
                연락처 추가
              </button>
            </div>
            
            {contactFields.map((field, index) => (
              <div key={field.id} className="array-field-group">
                <div className="array-field-header">
                  <h4>비상연락처 {index + 1}</h4>
                  {contactFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContact(index)}
                      className="btn btn-remove"
                    >
                      삭제
                    </button>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>이름</label>
                    <input
                      {...register(`emergencyContacts.${index}.name` as const, {
                        required: "이름을 입력해주세요",
                      })}
                      className={errors.emergencyContacts?.[index]?.name ? "error" : ""}
                    />
                    {errors.emergencyContacts?.[index]?.name && (
                      <span className="error-message">
                        {errors.emergencyContacts[index]?.name?.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>관계</label>
                    <input
                      {...register(`emergencyContacts.${index}.relationship` as const, {
                        required: "관계를 입력해주세요",
                      })}
                      className={errors.emergencyContacts?.[index]?.relationship ? "error" : ""}
                    />
                    {errors.emergencyContacts?.[index]?.relationship && (
                      <span className="error-message">
                        {errors.emergencyContacts[index]?.relationship?.message}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>전화번호</label>
                    <input
                      {...register(`emergencyContacts.${index}.phone` as const, {
                        required: "전화번호를 입력해주세요",
                      })}
                      className={errors.emergencyContacts?.[index]?.phone ? "error" : ""}
                    />
                    {errors.emergencyContacts?.[index]?.phone && (
                      <span className="error-message">
                        {errors.emergencyContacts[index]?.phone?.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>이메일</label>
                    <input
                      type="email"
                      {...register(`emergencyContacts.${index}.email` as const)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>경력</h3>
              <button
                type="button"
                onClick={() => appendExperience({ id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", isCurrent: false, description: "" })}
                className="btn btn-add"
              >
                경력 추가
              </button>
            </div>
            
            {experienceFields.map((field, index) => (
              <div key={field.id} className="array-field-group">
                <div className="array-field-header">
                  <h4>경력 {index + 1}</h4>
                  {experienceFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="btn btn-remove"
                    >
                      삭제
                    </button>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>회사명</label>
                    <input
                      {...register(`workExperience.${index}.company` as const, {
                        required: "회사명을 입력해주세요",
                      })}
                      className={errors.workExperience?.[index]?.company ? "error" : ""}
                    />
                    {errors.workExperience?.[index]?.company && (
                      <span className="error-message">
                        {errors.workExperience[index]?.company?.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>직책</label>
                    <input
                      {...register(`workExperience.${index}.position` as const, {
                        required: "직책을 입력해주세요",
                      })}
                      className={errors.workExperience?.[index]?.position ? "error" : ""}
                    />
                    {errors.workExperience?.[index]?.position && (
                      <span className="error-message">
                        {errors.workExperience[index]?.position?.message}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>시작일</label>
                    <input
                      type="date"
                      {...register(`workExperience.${index}.startDate` as const, {
                        required: "시작일을 입력해주세요",
                      })}
                      className={errors.workExperience?.[index]?.startDate ? "error" : ""}
                    />
                    {errors.workExperience?.[index]?.startDate && (
                      <span className="error-message">
                        {errors.workExperience[index]?.startDate?.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>종료일</label>
                    <input
                      type="date"
                      {...register(`workExperience.${index}.endDate` as const)}
                      className={errors.workExperience?.[index]?.endDate ? "error" : ""}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        {...register(`workExperience.${index}.isCurrent` as const)}
                      />
                      <span>현재 재직 중</span>
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>업무 내용</label>
                  <textarea
                    {...register(`workExperience.${index}.description` as const)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>기술</h3>
              <button
                type="button"
                onClick={() => appendSkill({ id: Date.now().toString(), name: "", level: 1, category: "" })}
                className="btn btn-add"
              >
                기술 추가
              </button>
            </div>
            
            {skillFields.map((field, index) => (
              <div key={field.id} className="array-field-group">
                <div className="array-field-header">
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
                
                <div className="form-row">
                  <div className="form-group">
                    <label>기술명</label>
                    <input
                      {...register(`skills.${index}.name` as const, {
                        required: "기술명을 입력해주세요",
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
                    <label>카테고리</label>
                    <select {...register(`skills.${index}.category` as const)}>
                      <option value="">카테고리를 선택해주세요</option>
                      {skillCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>숙련도 (1-5)</label>
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
            <code>useFieldArray</code>로 동적 배열 필드 관리
          </li>
          <li>
            <code>append</code>, <code>remove</code>, <code>move</code> 함수 활용
          </li>
          <li>
            복잡한 중첩 객체 배열 처리
          </li>
          <li>
            배열 내 필드별 유효성 검사
          </li>
          <li>
            배열 순서 변경 및 삭제 기능
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArrayFields;
