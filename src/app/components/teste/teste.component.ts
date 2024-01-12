import { Component, OnInit, ViewChild } from '@angular/core';

import testeData from "../../../assets/data/mtbi_questions.json"

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexMarkers
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.css'
})
export class TesteComponent implements OnInit {
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  title: string = "";
  questions: any;
  questionSelect: any;

  answers: object = {};

  E = 0
  I = 25
  S = 0
  N = 25
  T = 0
  F = 25
  J = 0
  P = 25

  personalidae: string[] = []
  personalidaeTexto: string = ""

  answersSelect: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false

  personality: { id: string, title: string, description: string }  = {
    id: "",
    title: "",
    description: "",
  }

  personalityTypes = [
    {
      id: "ISTJ",
      title: "O Logístico",
      description: "Pessoas quietas, sérias, práticas, realistas e responsáveis. Tomam decisões de forma lógica e trabalham de forma estável, independente de distrações. Sentem prazer em fazer as coisas de forma organizada, seja em casa, no trabalho ou em qualquer esfera da vida. São pessoas que valorizam tradições e lealdade."
    },
    {
      id: "ISFJ",
      title: "O Defensor",
      description: "Quietos, amigáveis, responsáveis e com alta conscienciosidade. São pessoas comprometidas e que cumprem com suas obrigações assiduamente. São leais e costumam ter grande consideração pelos outros, lembrando de características específicas de pessoas que são importantes para si. Se importam com como os outros se sentem e tentam sempre criar um ambiente harmonioso em casa e no trabalho."
    },
    {
      id: "INFJ",
      title: "O Advogado",
      description: "Buscam sentido e conexão em ideias, relações e posses materiais. Querem entender o que motiva as pessoas e costumam ter vários insights sobre os outros. Tem uma alta conscienciosidade e são comprometidos com seus valores. Desenvolvem uma visão clara sobre como servir ao bem comum, sendo organizados e decisivos na implementação dessa visão."
    },
    {
      id: "INTJ",
      title: "O Arquiteto",
      description: "São pessoas que possuem uma mente original e uma grande motivação em implementar suas ideias e atingir seus objetivos. Conseguem reconhecer padrões em eventos externos de forma rápida. Quando comprometidas, essas pessoas organizam o trabalho e vão até o fim. São céticas e independentes, tendo padrões altos de competência e performance, tanto para si quanto para os outros."
    },
    {
      id: "ISTP",
      title: "O Virtuoso",
      description: "Tolerantes e flexíveis, essas pessoas observam quietamente até que um problema apareça. Quando isso ocorre, elas agem rapidamente para encontrar soluções funcionais. Buscam analisar o que faz com que as coisas funcionem e conseguem isolar o centro de um problema mesmo quando há um grande número de informações a serem consideradas. São pessoas interessadas em causa e efeito, que organizam os fatos usando princípios lógicos e valorizando a eficiência."
    },
    {
      id: "ISFP",
      title: "O Aventureiro",
      description: "São pessoas quietas, amigáveis, sensíveis e gentis. Apreciam o momento presente e o que ocorre ao seu redor. Gostam de ter seu próprio espaço para trabalhar dentro do seu próprio ritmo. São leais e comprometidas com seus valores e pessoas que são importantes para si. Não gostam de desentendimentos e conflitos, bem como não tentam forçar suas opiniões e valores em outras pessoas."
    },
    {
      id: "INFP",
      title: "O Mediador",
      description: "Idealistas, legais aos seus valores e às pessoas importantes para si. Buscam uma vida externa que seja congruente com seus valores. São pessoas curiosas que rapidamente conseguem ver as possibilidades, podendo ser catalistas na implementação de ideias. Buscam entender as pessoas e ajudá-las a alcançar seu potencial. São adaptáveis, flexíveis e costumam ser bem acolhedoras, a menos que seus valores estejam sendo ameaçados."
    },
    {
      id: "INTP",
      title: "O Lógico",
      description: "São pessoas que buscam uma explicação lógica para tudo que capta seu interesse. Teóricas e abstratas, são mais interessadas em ideias do que em interações sociais. São quietas, contidas, flexíveis e adaptáveis. Possuem uma habilidade extraordinária de focar profundamente na resolução de problemas em áreas de interesse. São céticas e analíticas, podendo ser críticas às vezes."
    },
    {
      id: "ESTP",
      title: "O Empresário",
      description: "Flexíveis e tolerantes, essas pessoas abordam o mundo de forma prática, focada em resultados imediatos. Teorias e explicações conceituais são entediantes para essas pessoas, pois elas preferem agir de forma energética a fim de resolver um problema. Há um foco no aqui-e-agora, são espontâneas e aproveitam cada momento em que podem ser ativas com outras pessoas. Gostam de conforto material e aprendem melhor fazendo."
    },
    {
      id: "ESFP",
      title: "O Animador",
      description: "Pessoas extrovertidas, amigáveis e acolhedoras. São amantes da vida, das pessoas e de confortos materiais. Gostam de trabalhar com os outros para fazer coisas acontecerem. Trazem o senso comum e uma abordagem mais realista ao seu trabalho, e conseguem fazer o trabalho se tornar divertido. São flexíveis e espontâneas, se adaptam rapidamente a novas pessoas e ambientes. Aprendem melhor ao testar novas habilidades com outras pessoas."
    },
    {
      id: "ENFP",
      title: "O Ativista",
      description: "Entusiasmadas e imaginativas de maneira calorosa, essas pessoas veem a vida como cheia de possibilidades. Fazem conexões entre eventos e informações de forma rápida e procedem de maneira confiante com base nos padrões que conseguem perceber. Buscam bastante afirmação dos outros e costumam dar bastante apreciação e suporte em troca. São espontâneas e flexíveis e com frequência se apoiam em sua habilidade de improviso e fluência verbal."
    },
    {
      id: "ENTP",
      title: "O Inovador",
      description: "Pessoas rápidas, alertas, engenhosas, estimulantes e que falam com franqueza. Possuem muitos meios de resolver problemas novos e desafiadores. Costumam gerar possibilidades conceituais e analisá-las de forma estratégica. São boas em ler as outras pessoas. Ficam entediadas com a rotina e raramente farão a mesma coisa da mesma forma, adotando sempre novos interesses um atrás do outro."
    },
    {
      id: "ESTJ",
      title: "O Executivo",
      description: "São pessoas práticas e realistas que se movem rapidamente para implementar as decisões tomadas. São boas em organizar projetos e pessoas para realização de tarefas, focando em alcançar resultados do modo mais eficiente possível. Tomam conta de detalhes rotineiros, tendo clareza acerca de padrões lógicos que devem ser seguidos sistematicamente, tanto por si quanto pelos outros."
    },
    {
      id: "ESFJ",
      title: "O Cônsul",
      description: "Pessoas com alta conscienciosidade, cooperativas e afetuosas, buscam harmonia no seu ambiente e trabalhar de forma determinada para conseguir isso. Gostam de trabalhar com outras pessoas para completar tarefas de forma precisa e no tempo certo. São leais e vão até o final mesmo em coisas simples. Percebem o que os outros precisam no dia-a-dia e tentam prover isso. Querem ser apreciadas por quem são e pelo que podem contribuir."
    },
    {
      id: "ENFJ",
      title: "O Protagonista",
      description: "Empáticas, responsivas e responsáveis, essas pessoas são bem sintonizadas com as emoções, necessidades e motivações dos outros. Conseguem encontrar potencial em todas as pessoas, desejando ajudá-las a alcançar esse potencial. Podem agir como catalisadoras no crescimento pessoal ou de um grupo de pessoas. São leais e responsivas a elogios e críticas. Sociáveis, facilitam a formação de grupos e inspiram liderança."
    },
    {
      id: "ENTJ",
      title: "O Comandante",
      description: "São pessoas francas, decisivas, que assumem a liderança rapidamente. Percebem rapidamente procedimentos e políticas ilógicas e ineficientes. Trabalham desenvolvendo e implementando sistemas abrangentes para resolver problemas organizacionais. Gostam de planos de longo prazo e estabelecer objetivos. Geralmente são pessoas bem educadas e informadas, que gostam de expandir seu conhecimento e passá-lo para outras pessoas."
    }
  ];

  constructor() {
    this.personality = {
      id: "",
      title: "",
      description: "",
    }
  
    this.chartOptions = {
      series: [
        {
          name: "Pontuações do MBTI",
          data: [this.E, this.S, this.T, this.J, this.I, this.N, this.F, this.P]
        },
      ],
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      title: {
        text: ""
      },
      stroke: {
        width: 0
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: ['Extrovertido', 'Sensoriais', 'Racionalistas', 'Julgadores', 'Introvertido', 'Intuitivo', 'Sentimentais', 'Perceptivos']
      }
    };

  }

  ngOnInit(): void {
    if (testeData) {
      this.finished = false;
      this.title = testeData.title;
      this.questions = testeData.questions;
      this.questionSelect = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length

      this.questions = this.shuffleArray(this.questions);
    }
  }

  playerChoose(res: number, quadrant: string) {
    switch (quadrant) {
      case "ExI":
        this.E += res;
        this.I -= res;

        this.personalidae[0] = (this.E > this.I) ? "E" : "I"
        break;
      case "SxN":
        this.S += res;
        this.N -= res;

        this.personalidae[1] = (this.S > this.N) ? "S" : "N"
        break;
      case "TxF":
        this.T += res;
        this.F -= res;

        this.personalidae[2] = (this.T > this.F) ? "T" : "F"
        break;
      case "JxP":
        this.J += res;
        this.P -= res;

        this.personalidae[3] = (this.J > this.P) ? "J" : "P"
        break;
      default:
        break;

    }
    // this.answers?.push(res);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelect = this.questions[this.questionIndex];
    } else {
      // const finalAnswaer: string = await this.checkResult(this.answers!);

      this.finished = true;
      // this.answersSelect = testeData.results[finalAnswaer as keyof typeof testeData.results]

      // console.log(finalAnswaer, this.answers)
      // this.chartOptions = {
      //   series: [
      //     {
      //       name: "Pontuações do MBTI",
      //       data: [this.E, this.S, this.T, this.J, this.I, this.N, this.F, this.P]
      //     },
      //   ],


      this.chartOptions.series![0].data = [this.E, this.S, this.T, this.J, this.I, this.N, this.F, this.P]
      // this.answersSelect = `
      //   E = ${this.E}
      //   I = ${this.I}
      //   S = ${this.S}
      //   N = ${this.N}
      //   T = ${this.T}
      //   F = ${this.F}
      //   J = ${this.J}
      //   P = ${this.P}

      //   personalidade => ${this.personalidae}
      // `;

      this.personalidaeTexto = this.personalidae.join('')

      this.personality = this.personalityTypes.filter((type) => {
        if(type.id == this.personalidaeTexto){
          return type;
        }else{
          return
        }
      })[0];
      
      console.log(this.personality);

    }
  }

  shuffleArray(array: []) {
    // Crie uma cópia do array original para evitar modificá-lo diretamente
    const shuffledArray = array.slice();

    // Função de comparação aleatória para usar com o sort
    const randomComparison = () => Math.random() - 0.5;

    // Use a função sort com a comparação aleatória
    shuffledArray.sort(randomComparison);

    return shuffledArray;
  }

  async checkResult(anwsers: string[]) {
    // return anwsers.reduce((previous, current, i, arr) => {
    //   if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
    //     return previous;
    //   } else {
    //     return current;
    //   }
    // })
  }

  reset() {
    if (testeData) {
      this.finished = false;
      this.title = testeData.title;
      this.questions = testeData.questions;
      this.questionIndex = 0
      this.questionSelect = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length

      this.questions = this.shuffleArray(this.questions);
    }
  }

}
