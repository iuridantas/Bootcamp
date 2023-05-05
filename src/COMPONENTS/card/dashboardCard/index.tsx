import { FranchisePayload } from '../../../TYPES/franchise';
import Chart, { ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface CardProps {
  franchise: FranchisePayload;
}

export function CardDashboard({ franchise }: CardProps) {
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const commissionSum =
    franchise.finances
      ?.map((finance) => finance.commission)
      ?.reduce((acc, commission) => {
        if (acc === undefined) {
          return commission ?? 0;
        }
        if (commission === undefined) {
          return acc ?? 0;
        }
        return acc + commission;
      }, 0) ?? 0;

  useEffect(() => {
    if (canvasRef2.current) {
      const chartData2 = {
        labels: [`Comissão anual da franquia`],
        datasets: [
          {
            label: `${franchise.name}`,
            data: [commissionSum],
            backgroundColor: 'rgba(99, 122, 255, 0.2)',
            borderColor: '#8563ff',
            borderWidth: 2,
          },
        ],
      };

      const chartConfig2: ChartConfiguration<
        keyof ChartTypeRegistry,
        unknown[],
        string
      > = {
        type: 'bar',
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
        chart2.destroy();
      };
    }
  }, [franchise]);

  return (
    <div>
      <canvas ref={canvasRef2} />
    </div>
  );
}
