import { FranchisePayload } from '../../../TYPES/franchise';
import Chart, { ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface CardProps {
  franchise: FranchisePayload;
}

export function CardDashboardById({ franchise }: CardProps) {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef1.current && canvasRef2.current) {
      const chartData1 = {
        labels: ['Clientes', 'Chamados', 'Produtos'],
        datasets: [
          {
            label: `${franchise.name}`,
            data: [
              franchise.customers?.length,
              franchise.calls?.length,
              franchise.products?.length,
            ],
            backgroundColor: [
              'rgba(241, 65, 103, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };

      const chartConfig1: ChartConfiguration<
        keyof ChartTypeRegistry,
        unknown[],
        string
      > = {
        type: 'bar',
        data: chartData1,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax:
                Math.ceil(
                  Math.max(
                    franchise.customers?.length ?? 0,
                    franchise.calls?.length ?? 0,
                    franchise.products?.length ?? 0,
                  ) / 1,
                ) * 1,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      };

      const chart1 = new Chart(canvasRef1.current, chartConfig1);

      const chartData2 = {
        labels: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        datasets: [
          {
            label: 'Comissão',
            data:
              franchise.finances?.map((finance) => finance.commission) ?? [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
          },
        ],
      };

      const chartConfig2: ChartConfiguration<
        keyof ChartTypeRegistry,
        unknown[],
        string
      > = {
        type: 'line',
        data: chartData2,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax:
                Math.ceil(
                  Math.max(
                    ...(franchise.finances?.map(
                      (finance) => finance.commission ?? 0,
                    ) ?? []),
                  ) / 10,
                ) * 10,
              ticks: {
                stepSize: 10,
              },
            },
          },
        },
      };

      const chart2 = new Chart(canvasRef2.current, chartConfig2);

      return () => {
        chart1.destroy();
        chart2.destroy();
      };
    }
  }, [franchise]);

  return (
    <div>
      <canvas ref={canvasRef1} />
      <canvas ref={canvasRef2} />
    </div>
  );
}
