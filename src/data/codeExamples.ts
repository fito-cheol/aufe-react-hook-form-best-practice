// React Hook Form 코드 예시들을 중앙에서 관리

export const basicFormExamples = [
  {
    title: "useForm 훅 사용법",
    description: "기본적인 폼 상태 관리를 위한 useForm 훅 사용법",
    code: `import { useForm } from "react-hook-form";

const { register, handleSubmit, formState: { errors } } = useForm();

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("firstName", { required: true })} />
    {errors.firstName && <span>이름을 입력해주세요</span>}
  </form>
);`,
  },
  {
    title: "register 함수로 필드 등록",
    description: "입력 필드를 React Hook Form에 등록하는 방법",
    code: `// 기본 등록
<input {...register("name")} />

// 유효성 검사와 함께 등록
<input {...register("email", { 
  required: "이메일을 입력해주세요",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
    message: "올바른 이메일 형식이 아닙니다"
  }
})} />`,
  },
  {
    title: "handleSubmit으로 폼 제출 처리",
    description:
      "폼 제출 시 유효성 검사와 데이터 처리를 위한 handleSubmit 사용법",
    code: `const onSubmit = (data) => {
  console.log("폼 데이터:", data);
  // API 호출 또는 데이터 처리
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* 폼 필드들 */}
    <button type="submit">제출</button>
  </form>
);`,
  },
];

export const validationExamples = [
  {
    title: "Zod 스키마 정의",
    description: "Zod를 사용한 유효성 검사 스키마 정의",
    code: `import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  age: z.number().min(18, "18세 이상이어야 합니다")
});`,
  },
  {
    title: "zodResolver 연동",
    description: "React Hook Form과 Zod를 연결하는 zodResolver 사용법",
    code: `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});`,
  },
  {
    title: "커스텀 유효성 검사",
    description: "refine을 사용한 복잡한 유효성 검사 규칙",
    code: `const schema = z.object({
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"]
});`,
  },
];

export const dynamicFieldsExamples = [
  {
    title: "useFieldArray 기본 사용법",
    description: "동적 배열 필드를 관리하는 useFieldArray 훅 사용법",
    code: `import { useForm, useFieldArray } from "react-hook-form";

const { control, register } = useForm({
  defaultValues: { items: [{ name: "" }] }
});

const { fields, append, remove } = useFieldArray({ 
  control, 
  name: "items" 
});`,
  },
  {
    title: "동적 필드 렌더링",
    description: "배열 필드를 동적으로 렌더링하는 방법",
    code: `{fields.map((field, index) => (
  <div key={field.id}>
    <input {...register(\`items.\${index}.name\`)} />
    <button type="button" onClick={() => remove(index)}>
      삭제
    </button>
  </div>
))}`,
  },
  {
    title: "필드 추가/제거",
    description: "새 필드 추가와 기존 필드 제거 기능",
    code: `// 새 필드 추가
const addItem = () => {
  append({ name: "" });
};

// 필드 제거
const removeItem = (index) => {
  remove(index);
};`,
  },
];

export const customComponentsExamples = [
  {
    title: "Controller 컴포넌트 사용",
    description: "외부 컴포넌트를 React Hook Form과 연결하는 Controller 사용법",
    code: `import { Controller } from "react-hook-form";

<Controller
  name="customField"
  control={control}
  render={({ field }) => (
    <CustomInput {...field} />
  )}
/>`,
  },
  {
    title: "커스텀 컴포넌트 구현",
    description: "React Hook Form과 호환되는 커스텀 컴포넌트 구현",
    code: `const CustomInput = ({ value, onChange, onBlur, name }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onBlur={onBlur}
    name={name}
  />
);`,
  },
];

export const conditionalFieldsExamples = [
  {
    title: "useWatch 훅 사용",
    description: "특정 필드 값을 감시하여 조건부 렌더링을 위한 useWatch 사용법",
    code: `import { useWatch } from "react-hook-form";

const watchedValue = useWatch({
  control,
  name: "fieldName"
});

return (
  <div>
    {watchedValue === "specificValue" && (
      <input {...register("conditionalField")} />
    )}
  </div>
);`,
  },
  {
    title: "조건부 유효성 검사",
    description: "조건에 따른 동적 유효성 검사 규칙",
    code: `const schema = z.object({
  hasPhone: z.boolean(),
  phone: z.string().optional()
}).refine((data) => {
  if (data.hasPhone && !data.phone) {
    return false;
  }
  return true;
}, {
  message: "전화번호를 입력해주세요",
  path: ["phone"]
});`,
  },
];

export const arrayFieldsExamples = [
  {
    title: "복잡한 배열 필드 관리",
    description: "중첩된 객체 배열을 관리하는 방법",
    code: `const { fields, append, remove, move } = useFieldArray({
  control,
  name: "addresses"
});

// 필드 추가
const addAddress = () => {
  append({
    type: "home",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    isPrimary: false
  });
};`,
  },
  {
    title: "배열 필드 순서 변경",
    description: "move 함수를 사용한 배열 필드 순서 변경",
    code: `// 위로 이동
<button onClick={() => move(index, index - 1)}>↑</button>

// 아래로 이동  
<button onClick={() => move(index, index + 1)}>↓</button>`,
  },
  {
    title: "배열 내 유효성 검사",
    description: "배열 내 각 필드에 대한 개별 유효성 검사",
    code: `{fields.map((field, index) => (
  <div key={field.id}>
    <input 
      {...register(\`addresses.\${index}.street\`, {
        required: "도로명 주소를 입력해주세요"
      })}
    />
    {errors.addresses?.[index]?.street && (
      <span>{errors.addresses[index].street.message}</span>
    )}
  </div>
))}`,
  },
];

export const nestedObjectsExamples = [
  {
    title: "중첩 객체 구조 정의",
    description: "복잡한 중첩 객체 구조를 위한 타입 정의",
    code: `interface FormData {
  personalInfo: {
    name: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
}`,
  },
  {
    title: "점 표기법으로 중첩 필드 접근",
    description: "중첩된 객체의 필드에 접근하는 방법",
    code: `// 중첩 필드 등록
<input {...register("personalInfo.name")} />
<input {...register("address.street")} />
<input {...register("preferences.newsletter")} />

// 중첩 필드 에러 처리
{errors.personalInfo?.name && (
  <span>{errors.personalInfo.name.message}</span>
)}`,
  },
  {
    title: "중첩 객체 유효성 검사",
    description: "Zod를 사용한 중첩 객체 유효성 검사",
    code: `const schema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "이름을 입력해주세요"),
    email: z.string().email("올바른 이메일 형식이 아닙니다")
  }),
  address: z.object({
    street: z.string().min(1, "도로명 주소를 입력해주세요"),
    city: z.string().min(1, "도시를 입력해주세요")
  })
});`,
  },
];
