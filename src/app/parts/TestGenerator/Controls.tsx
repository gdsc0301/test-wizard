import { FC, useEffect, useState } from "react";
import { Add, Close, KeyboardReturnRounded, Save } from "@mui/icons-material";
import { Input, Button, Chip, Textarea, PressEvent, Tooltip } from "@heroui/react";
import Question from "./Question";
import alternativeMap from "@/app/maps/AlternativeMap";

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  pageColumns: number;
  setPageColumns: React.Dispatch<React.SetStateAction<number>>;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  testName: string;
  setTestName: React.Dispatch<React.SetStateAction<string>>;
  newMannualField: string;
  setNewMannualField: React.Dispatch<React.SetStateAction<string>>;
  mannualFields: string[];
  setMannualFields: ReactSetState<string[]>;
  questions: Question[];
  setQuestions: ReactSetState<Question[]>;
}

const Controls: FC<Props> = ({
  questions,
  setQuestions,
  pageColumns,
  setPageColumns,
  zoomLevel,
  setZoomLevel,
  testName,
  setTestName,
  newMannualField,
  setNewMannualField,
  mannualFields,
  setMannualFields
}) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const onChangeQuestion = (index: number, attribute: string, value: string) => {
    setQuestions(currQuestions => {
      const updatedQuestions = [...currQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [attribute]: value
      };
      return updatedQuestions;
    });
  }

  const onConfirmNewQuestion = () => {
    setQuestions(currQuestions => {
      const updatedQuestions = [...currQuestions];
      updatedQuestions.push({
        question: 'Enunciado da questão',
        A: 'Alternativa A',
        B: 'Alternativa B',
        C: 'Alternativa C',
        D: 'Alternativa D',
        E: 'Alternativa E',
        answer: 'A'
      });
      return updatedQuestions;
    });

    setSelectedQuestionIndex(questions.length);
  }

  useEffect(() => {
    if (selectedQuestionIndex >= questions.length) {
      setSelectedQuestionIndex(questions.length - 1);
    }
  }, [questions, selectedQuestionIndex]);

  return <>
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {Array(questions.length || 1).fill(0).map((_, i) => (
            <Button
              key={`selectQuestion${i}`}
              onPress={() => setSelectedQuestionIndex(i)}
              variant={selectedQuestionIndex === i ? "solid" : "light"}
              size="sm"
              color="primary"
              isIconOnly
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <h3 className="text-xl mb-4">Nova Questão</h3>
        <div id="newQuestion" className="grid gap-2">
          <Textarea
            onValueChange={(value) => onChangeQuestion(selectedQuestionIndex, 'question', value)}
            value={questions[selectedQuestionIndex]?.question}
            name="question"
            label="Enunciado"
            isClearable
          />

          {alternativeMap.map((alt, i) => (
            <Input
              key={`question${i}`}
              type="text"
              onValueChange={(value) => onChangeQuestion(selectedQuestionIndex, alt, value)}
              value={questions[selectedQuestionIndex]?.[alt as keyof Question] || ''}
              name={alt}
              placeholder={`Alternativa "${alt}"`}
            />
          ))}

          <Button
            color="primary"
            onPress={onConfirmNewQuestion}
          >
            Confirmar <Save />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <h3 className="text-xl mb-4">Cabeçalho</h3>
        <div className="grid gap-2">
          <Input
            label="Nome do teste"
            placeholder="Ex. Teste de Matemática - 1º Bimestre"
            onChange={(e) => setTestName(e.target.value)}
            value={testName}
          />

          <Input
            label="Campos do cabeçalho, separados por vírgula"
            placeholder="Ex. Nome, Turma, Data"
            value={newMannualField}
            style={{ maxWidth: '10' }}
            multiple={true}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                setMannualFields([...mannualFields, newMannualField]);
                setNewMannualField("");
              } else if (e.key === 'Backspace' && newMannualField === '') {
                e.preventDefault();
                setMannualFields(mannualFields.slice(0, -1));
              }
            }}
            endContent={<><small style={{ display: 'flex' }}><KeyboardReturnRounded /></small></>}
            onChange={e => setNewMannualField(e.target.value || '')}
          />

          <nav className="flex flex-wrap gap-2 mb-4">
            {mannualFields.map(field => (
              <Chip
                key={field}
                color="primary"
                style={{ cursor: 'pointer' }}
                size="sm"
                endContent={<Close sx={{ fontSize: '14px' }} />}
                onClick={() => setMannualFields(mannualFields.filter(f => f !== field))}
              >
                {field}
              </Chip>
            ))}
          </nav>

          <h3 className="text-xl mb-4">Opções</h3>
          <fieldset>
            <label>
              <div>Tamanho da fonte</div>
              <input
                type="range"
                min={.1} max={3} step={.1}
                onChange={(e) => {
                  setZoomLevel(parseFloat(e.target.value))
                }}
                onDoubleClick={() => setZoomLevel(1)}
                value={zoomLevel}
                list="markers"
                className="w-full text-white"
              />

              <datalist id="markers" className="flex justify-between w-full font-sans">
                <option value="0.1" label="10%"></option>
                <option value="0.5" label="50%"></option>
                <option value="1" label="100%"></option>
                <option value="1.5" label="150%"></option>
                <option value="2" label="200%"></option>
                <option value="2.5" label="250%"></option>
                <option value="3" label="300%"></option>
              </datalist>
            </label>
          </fieldset>

          <fieldset>
            <label>
              <div>Colunas de questões</div>
              <input
                type="range"
                min={1} max={4}
                onChange={(e) => {
                  setPageColumns(parseInt(e.target.value))
                }}
                onDoubleClick={() => setPageColumns(3)}
                value={pageColumns}
                list="markers"
                className="w-full text-white"
              />

              <datalist id="markers" className="flex justify-between w-full font-sans">
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
              </datalist>
            </label>
          </fieldset>
        </div>
      </div>
    </div>
  </>
}

export default Controls;