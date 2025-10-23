import React from "react";
import { Link } from "react-router-dom";
import { featureCatalog } from "../../data/featureCatalog";
import CodeExample from "../../components/CodeExample";
import {
  useFormExamples,
  registerExamples,
  handleSubmitExamples,
  formStateErrorsExamples,
  zodResolverExamples,
  useFieldArrayExamples,
  controllerExamples,
  useWatchExamples,
  nestedObjectsExamples,
} from "../../data/codeExamples";

const examplesByFeature: Record<string, { title: string; items: any[] }> = {
  useForm: { title: "useForm", items: useFormExamples },
  register: { title: "register", items: registerExamples },
  handleSubmit: { title: "handleSubmit", items: handleSubmitExamples },
  "formState.errors": {
    title: "formState.errors",
    items: formStateErrorsExamples,
  },
  zodResolver: { title: "zodResolver", items: zodResolverExamples },
  useFieldArray: { title: "useFieldArray", items: useFieldArrayExamples },
  Controller: { title: "Controller", items: controllerExamples },
  useWatch: { title: "useWatch", items: useWatchExamples },
  NestedObject: { title: "중첩 객체", items: nestedObjectsExamples },
};

const FeatureGuide: React.FC = () => {
  return (
    <div className="page">
      <h1>React Hook Form 기능별 가이드</h1>
      <p className="page-description">
        RHF(React Hook Form)의 핵심 기능을 기준으로 개념 설명과 관련 예제를 함께
        제공합니다. 각 기능을 눌러 문서를 확인하고, 예제 버튼으로 바로
        이동하세요.
      </p>

      <div className="examples-grid">
        {featureCatalog.map((feature) => (
          <div key={feature.id} className="example-card" id={feature.id}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {feature.docs && (
                <a
                  href={feature.docs}
                  target="_blank"
                  rel="noreferrer"
                  className="example-link"
                >
                  문서 보기 ↗
                </a>
              )}
              {feature.route && (
                <Link to={feature.route} className="example-link">
                  예제로 이동 →
                </Link>
              )}
            </div>

            <div style={{ marginTop: "1rem" }}>
              {examplesByFeature[
                feature.id as keyof typeof examplesByFeature
              ] && (
                <CodeExample
                  title={`${feature.title} 기본 사용 예시`}
                  description={`${feature.title}의 핵심 사용법을 간단히 보여줍니다.`}
                  code={
                    examplesByFeature[
                      feature.id as keyof typeof examplesByFeature
                    ].items[0]?.code || ""
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGuide;
