import React,{useEffect,useReducer,useState} from "react";
import styles from './stack.module.css'


export default function StackO() {

    const qANDr = [
        {
          id: 293293,
          date: "2022-09-12T12:34:45",
          question: "How to center a div?",
          status: 'active',
          answers: [
            {
              id: 3239213,
              answer: "Answer 1",
              score: -3
            },
            {
              id: 98392230,
              answer: "Use `text-align: center`",
              score: 2
            },
            {
              id: 98943483,
              answer: "The div wrapper should have display flex",
              score: 19
            },
            {
              id: 766329392,
              answer: "Some representative placeholder content for the second slide of the carousel.",
              score: 1
            },
          ],
          tags: ["HTML", "CSS"],
          score: 23,
        },
        {
          id: 837273,
          date: "2023-01-03T04:14:37",
          question: "How to install NodeJS?",
          status: 'deleted',
          answers: [
            {
              id: 7177112,
              answer: "NodeJS is part of JS",
              score: 1
            },
            {
              id: 2567723,
              answer: "Visit their site at nodejs.org",
              score: 7
            },
            {
              id: 6612122,
              answer: "Can we say, this question is stupid",
              score: -5
            },
            {
              id: 9001212,
              answer: "Visit the official website nodejs.org",
              score: 0
            },
          ],
          tags: ["JS", "NodeJS", "Engine"],
          score: 3,
        },
        {
          id: 122181,
          date: "2022-11-17T14:08:12",
          question: "useEffect in React triggered twice",
          status: 'active',
          score:0,
          answers: [
            {
              id: 2039934,
              answer: "Maybe you call the callback function twice",
              score: 1
            },
            {
              id: 1288343,
              answer: "If you have a button, make sure it does not trigger the callback function",
              score: 10
            },
            {
              id: 5949283,
              answer: "Sometimes React.Strict trigger your app twice, for testing purpose (only in dev)",
              score: 23
            },
            {
              id: 8288823,
              answer: "no clean function",
              score: 1
            },
          ],
          tags: ["React", "JS", "JavaScript", "React-DOOM"],
          score: 30,
        },
      ]


      const initialState = qANDr.map((el) => ({ id: el.id, score: 0 }));
      const initialStateA = qANDr.map(el => {
        const answers = el.answers.map(ans => ({ id: ans.id, score: 0 }));
        return { id: el.id, answers };
      });


      const reducer1 = (stateA, action) => {
        switch (action.type) {
          case "AJOUTE1":
            return stateA.map(ele => {
              if (ele.id === action.questionId) {
                return {
                  ...ele,
                  answers: ele.answers.map(ans =>
                    ans.id === action.answerId ? { ...ans, score: ans.score + 1 } : ans
                  )
                };
              }
              return ele;
            });
      
          case "RETIRE1":
            return stateA.map(ele => {
              if (ele.id === action.questionId) {
                return {
                  ...ele,
                  answers: ele.answers.map(ans =>
                    ans.id === action.answerId ? { ...ans, score: ans.score - 1 } : ans
                  )
                };
              }
              return ele;
            });
      
          case "DELETE1":
            return stateA.map((item) => {
              if (item.id === action.questionId) {
                const newAnswers = item.answers.filter(
                  (answer) => answer.id !== action.answerId
                );
                return { ...item, answers: newAnswers };
              }
              return item;
            });
          default:
            return stateA;
        }
      };
      
      const reducer = (state, action) => {
        switch (action.type) {
          case "AJOUTE":
            return state.map((ele) =>
              ele.id === action.id ? { ...ele, score: ele.score + 1 } : ele
            );
          case "RETIRE":
            return state.map((ele) =>
              ele.id === action.id ? { ...ele, score: ele.score - 1 } : ele
            );
            case "DELETE":
                return state.filter(ele => ele.id !== action.id);         
            default:
            return state;
        }
      };

      const [sortType, setSortType] = useState("Date");
      const [filterStatus, setFilterStatus] = useState("All");
      const [state, dispatch] = useReducer(reducer, initialState);
      const [stateA, dispatchA] = useReducer(reducer1, initialStateA);
      const [defaultAnswer, setDefaultAnswer] = useState('pa gen repons'); 

      useEffect(() => {
        const firstQuestion = qANDr.find((q) => q.answers.length > 0);
        if (firstQuestion) {
          setDefaultAnswer(firstQuestion.answers[0]);
        }
      }, []);
      

      return (
        <>
          <div>
        <label>Filtrer par statut: </label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={styles.select}>
          <option value="All">Tous</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label>Trier par: </label>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}  className={styles.select}>
          <option value="Date">recent</option>
          <option value="Score">Popular</option>
          <option value="Answers">Hot</option>
        </select>
      </div>

      {qANDr
        .filter((it) => filterStatus === "All" 
        || (filterStatus === "Active" && it.status === "active") 
        || (filterStatus === "Inactive" && it.status !== "active"))
        .sort((a, b) => {
          if (sortType === "Date") {
            return new Date(b.date) - new Date(a.date); 
          } else if (sortType === "Score") {
            return b.score - a.score;
          } else if (sortType === "Answers") {
            return b.answers.length - a.answers.length; 
          }
          return 0;
        })
  .map((it) => {
    const questionState = state.find((el) => el.id === it.id);
    const answersState = stateA.find((sa) => sa.id === it.id);
    if (!questionState) {
        return null;
    }

    return (
      <div key={it.id} className={styles.question}>
            <h2 className={styles.questionTitle}>{it.question}</h2>
        <   span className={styles.questionDate}>{it.date}</span>
        
            <div className={styles.questionActions}>
            <div className={styles.d}>
            <button onClick={() => dispatch({ type: "RETIRE", id: it.id })} className={styles.button}> - </button>
            <label className={styles.questionScore}>Score :{questionState?.score}</label>
            <button onClick={() => dispatch({ type: "AJOUTE", id: it.id })} className={styles.button}> + </button>
            </div>
            <button onClick={() => dispatch({ type: "DELETE", id: it.id })} className={styles.button}>EFASE</button>
        </div>
        
        <hr />
        <strong className={styles.questionTitle}>TOTAL REPONS</strong>
  <h3>
    {it.answers.map((ans) => (
      <div key={ans.id} className={styles.ans}>
        <div className={styles.ansTitle}>{ans.answer}</div><br />
        <div className={styles.d}><button onClick={() => dispatchA({ type: "RETIRE1", questionId: it.id, answerId: ans.id })} className={styles.button}> - </button>
        <label>Score :{answersState?.answers.find((a) => a.id === ans.id)?.score}</label>
        <button onClick={() => dispatchA({ type: "AJOUTE1", questionId: it.id, answerId: ans.id })} className={styles.button}> + </button>
        </div>
        <button onClick={() => dispatchA({ type: "DELETE1", questionId: it.id, answerId: ans.id })} className={styles.button}> EFASE </button>
        <br />
        <div className={styles.defaultAnswer}>
          {defaultAnswer &&
            defaultAnswer.questionId === it.id &&
            `Réponse par défaut: ${defaultAnswer.answer}`}
        </div>
        <div className={styles.tags}>
          <li>Tags: {it.tags.join(", ")}</li>
        </div>        
      </div>
    ))}
  </h3>
</div>
    );
  })}
    </>
);
}
      