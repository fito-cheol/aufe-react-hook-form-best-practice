import React from "react";
import { useParams, Link } from "react-router-dom";
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

const FeatureDetail: React.FC = () => {
  const { featureId } = useParams();
  const feature = featureCatalog.find((f) => f.id === featureId);

  if (!feature) {
    return (
      <div className="page">
        <h1>기능을 찾을 수 없습니다</h1>
        <p className="page-description">좌측 목록에서 기능을 선택해주세요.</p>
        <Link to="/examples/features" className="example-link">
          기능 목록으로
        </Link>
      </div>
    );
  }

  const related =
    examplesByFeature[feature.id as keyof typeof examplesByFeature];

  return (
    <div className="page">
      <h1>{feature.title}</h1>
      <p className="page-description">{feature.description}</p>

      <div className="form-container">
        <div className="form-section">
          <h3>개요</h3>
          {feature.docs && (
            <a
              href={feature.docs}
              target="_blank"
              rel="noreferrer"
              className="example-link"
            >
              공식 문서 보기 ↗
            </a>
          )}
        </div>

        {related?.items?.map((ex, idx) => (
          <div key={idx} className="form-section">
            <CodeExample
              title={ex.title}
              description={ex.description}
              code={ex.code}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureDetail;
