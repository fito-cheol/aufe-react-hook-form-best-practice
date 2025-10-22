import React from "react";
import { useForm, Controller } from "react-hook-form";
import CodeExample from "../../components/CodeExample";
import { customComponentsExamples } from "../../data/codeExamples";

interface FormData {
  name: string;
  email: string;
  age: number;
  country: string;
  newsletter: boolean;
  preferences: string[];
  rating: number;
  comments: string;
}

// 커스텀 Input 컴포넌트
interface CustomInputProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  children,
}) => (
  <div className="custom-input">
    <label className="custom-label">{label}</label>
    {children}
    {error && <span className="error-message">{error}</span>}
  </div>
);

// 커스텀 Select 컴포넌트
interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="custom-select"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// 커스텀 Checkbox 컴포넌트
interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => (
  <label className="custom-checkbox">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="checkmark"></span>
    {label}
  </label>
);

// 커스텀 Radio Group 컴포넌트
interface CustomRadioGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
}) => (
  <div className="custom-radio-group">
    {options.map((option) => (
      <label key={option.value} className="custom-radio">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="radio-mark"></span>
        {option.label}
      </label>
    ))}
  </div>
);

// 커스텀 Slider 컴포넌트
interface CustomSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1,
}) => (
  <div className="custom-slider">
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      step={step}
      className="slider"
    />
    <div className="slider-labels">
      <span>{min}</span>
      <span className="current-value">{value}</span>
      <span>{max}</span>
    </div>
  </div>
);

const CustomComponents: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      age: 25,
      country: "",
      newsletter: false,
      preferences: [],
      rating: 5,
      comments: "",
    },
  });

  const countries = [
    { value: "kr", label: "대한민국" },
    { value: "us", label: "미국" },
    { value: "jp", label: "일본" },
    { value: "cn", label: "중국" },
    { value: "gb", label: "영국" },
  ];

  const preferences = [
    { value: "technology", label: "기술" },
    { value: "sports", label: "스포츠" },
    { value: "music", label: "음악" },
    { value: "travel", label: "여행" },
    { value: "food", label: "음식" },
  ];

  const onSubmit = (data: FormData) => {
    console.log("커스텀 컴포넌트 데이터:", data);
    alert("커스텀 컴포넌트가 성공적으로 제출되었습니다!\n콘솔을 확인해보세요.");
  };

  return (
    <div className="page">
      <h1>커스텀 컴포넌트 예제</h1>
      <p className="page-description">
        React Hook Form의 <code>Controller</code>를 사용하여 커스텀 컴포넌트를
        만드는 예제입니다. 재사용 가능한 폼 컴포넌트를 구현하는 방법을
        보여줍니다.
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
                name: "테스터",
                email: "test@example.com",
                age: 30,
                country: "kr",
                newsletter: true,
                preferences: ["technology", "music"],
                rating: 8,
                comments: "컴포넌트 예시 데이터를 자동으로 채웠습니다.",
              })
            }
          >
            예시 채우기
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-section">
            <h3>기본 정보</h3>

            <Controller
              name="name"
              control={control}
              rules={{ required: "이름을 입력해주세요" }}
              render={({ field, fieldState }) => (
                <CustomInput label="이름" error={fieldState.error?.message}>
                  <input
                    {...field}
                    type="text"
                    className={fieldState.error ? "error" : ""}
                  />
                </CustomInput>
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "올바른 이메일 형식을 입력해주세요",
                },
              }}
              render={({ field, fieldState }) => (
                <CustomInput label="이메일" error={fieldState.error?.message}>
                  <input
                    {...field}
                    type="email"
                    className={fieldState.error ? "error" : ""}
                  />
                </CustomInput>
              )}
            />

            <Controller
              name="age"
              control={control}
              rules={{
                required: "나이를 입력해주세요",
                min: { value: 1, message: "나이는 1 이상이어야 합니다" },
                max: { value: 120, message: "나이는 120 이하여야 합니다" },
              }}
              render={({ field, fieldState }) => (
                <CustomInput label="나이" error={fieldState.error?.message}>
                  <input
                    {...field}
                    type="number"
                    min="1"
                    max="120"
                    className={fieldState.error ? "error" : ""}
                  />
                </CustomInput>
              )}
            />
          </div>

          <div className="form-section">
            <h3>선택 사항</h3>

            <Controller
              name="country"
              control={control}
              rules={{ required: "국가를 선택해주세요" }}
              render={({ field, fieldState }) => (
                <CustomInput label="국가" error={fieldState.error?.message}>
                  <CustomSelect
                    options={countries}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="국가를 선택해주세요"
                  />
                </CustomInput>
              )}
            />

            <Controller
              name="newsletter"
              control={control}
              render={({ field }) => (
                <CustomInput label="뉴스레터 구독">
                  <CustomCheckbox
                    label="뉴스레터를 구독하시겠습니까?"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </CustomInput>
              )}
            />

            <Controller
              name="preferences"
              control={control}
              render={({ field }) => (
                <CustomInput label="관심 분야">
                  <div className="checkbox-group">
                    {preferences.map((pref) => (
                      <CustomCheckbox
                        key={pref.value}
                        label={pref.label}
                        checked={field.value.includes(pref.value)}
                        onChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, pref.value]);
                          } else {
                            field.onChange(
                              field.value.filter((v) => v !== pref.value)
                            );
                          }
                        }}
                      />
                    ))}
                  </div>
                </CustomInput>
              )}
            />
          </div>

          <div className="form-section">
            <h3>추가 정보</h3>

            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <CustomInput label="만족도">
                  <CustomSlider
                    min={1}
                    max={10}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </CustomInput>
              )}
            />

            <Controller
              name="comments"
              control={control}
              render={({ field }) => (
                <CustomInput label="의견">
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="의견을 남겨주세요"
                    className="custom-textarea"
                  />
                </CustomInput>
              )}
            />
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
            <code>Controller</code> 컴포넌트로 커스텀 컴포넌트 래핑
          </li>
          <li>
            <code>render</code> prop으로 커스텀 렌더링
          </li>
          <li>
            <code>field</code>와 <code>fieldState</code>로 상태 관리
          </li>
          <li>재사용 가능한 커스텀 컴포넌트 설계</li>
          <li>복잡한 상태 로직을 컴포넌트 내부에서 처리</li>
        </ul>
        
        <h3>코드 예시</h3>
        {customComponentsExamples.map((example, index) => (
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

export default CustomComponents;
