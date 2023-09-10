import { Add, Print } from "@mui/icons-material";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import React, { FormEvent, useState } from "react";
import Question from "./Question";

const testCategories = [
    "Categoria A",
    "Categoria B",
    "Categoria C",
    "Categoria D"
];
const styles = {
    testPage: {
        width: "210mm",
        height: "297mm",
        padding:"1cm 2cm",
        objectFit: "contain",
        transformOrigin: "top left",
        transform: "scale(.75)",
        chapter: {
            marginTop: 0,
        },
        printButton: {
            position: "absolute",
            top: 0,
            right: 0,
            transform: "translate(50%, -50%)"
        },
        questions: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            maxHeight: "80%",
            marginTop: "32px",
            columnCount: 3,
            question: {
                breakInside: "avoid",
                breakBefore: "column",
                text: {
                    marginTop: 0
                },
                alternatives: {
                    listStyle: "lower-alpha"
                }
            }
        }
    }
};

type QuestionsList = {
    [bookChapter: number] : Question[];
};

const initialCat = "Category";
const TestGenerator = () => {
    const [bookName, setBookName] = useState("");
    const [selectedCat, setSelectedCat] = useState(initialCat);

    const [newQuestion, setNewQuestion] = useState<Question>();

    const [questions, setQuestions] = useState<QuestionsList>({});

    const addQuestion = (e: FormEvent) => {
        e.preventDefault();
    };

    const bindInput = () => {

    }

    return <>
        <div className="container mt-8">
            <div className="container max-w-4xl grid gap-2 lg:grid-cols-2">
                <div>
                    <h3>Adicionar pergunta</h3>
                    <form id="newQuestion" onSubmit={addQuestion}>
                        <div className="grid gap-2 lg:grid-cols-[3fr_1fr]">
                            <div className="block">
                                <Input type="text" onChange={bindInput} name="question" label="Insira a pergunta" required />
                            </div>
                            <div className="block">
                                <Input type="number" onChange={bindInput} name="questionChapter" label="Capítulo" required />
                            </div>
                        </div>
                        
                        <Input type="text" onChange={bindInput} name="A" placeholder='Resposta "A"' required/>
                        <Input type="text" onChange={bindInput} name="B" placeholder='Resposta "B"' required/>
                        <Input type="text" onChange={bindInput} name="C" placeholder='Resposta "C"' required/>
                        <Input type="text" onChange={bindInput} name="D" placeholder='Resposta "D"' required/>
                        
                        <Button
                            color="primary"
                            type="submit">
                                Inserir nova Pergunta<Add />
                        </Button>
                    </form>
                </div>
                <div>
                    <h3>Informações da Prova</h3>
                    <div className="grid gap-2">
                        <div>
                            <Input
                                label="Nome do livro"
                                placeholder="Ex. O Libertador"
                                onChange={(e) => setBookName(e.target.value)} />
                        </div>
                        <div>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>{Array.from(selectedCat)[0]}</Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedCat}
                                    onSelectionChange={key => setSelectedCat(key.toString())}>
                                        {testCategories.map(cat => (
                                            <DropdownItem key={cat}>cat</DropdownItem>
                                        ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <span className="block mt-8 mb-2 text-xs opacity-50">Pré visualização</span>
            <div className="aspect-[210mm_297mm] drop-shadow-md">
                <Button
                    className="noPrint"
                    radius="full"
                    color="primary"
                    onClick={()=>window.print()}
                >
                    <Print />
                </Button>
                <h1>
                    Quem Sabe Prova - { new Date().toLocaleString("pt-br", {year: "numeric"})} - { bookName }
                    <br/>
                    { selectedCat !== initialCat && selectedCat }
                </h1>
                <div className="w-full grid gap-1">
                    <div className="w-full grid grid-cols-[2fr_1fr]">
                        <div>
                            <span>Nome: _______________________________________</span>
                        </div>
                        <div>
                            <span>Idade: _______</span>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-[2fr_1fr]">
                        <div>
                            <span>Clube: ______________________________________</span>
                        </div>
                        <div>
                            <span>Região: _______</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 mt-8">
                    {
                        Object.keys(questions).map((chapterNumber) => {
                            const currChapterQuestions: Question[] = questions[parseInt(chapterNumber)];

                            return currChapterQuestions && <>
                                <h4>Capítulo {chapterNumber}</h4>
                                {
                                    currChapterQuestions.map(
                                        (question, i) => {
                                            return (
                                                <div key={`chapter${chapterNumber}Question${i}`}>
                                                    <h5>{++i}) {question.question}</h5>
                                                    <ol>
                                                        <li>{question.A}</li>
                                                        <li>{question.B}</li>
                                                        <li>{question.C}</li>
                                                        <li>{question.D}</li>
                                                    </ol>
                                                </div>
                                            );
                                        }
                                    )
                                }
                            </>;
                        })
                    }
                </div>
            </div>
        </div>
    </>;
}

export default TestGenerator;