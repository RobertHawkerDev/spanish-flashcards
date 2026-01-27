import { topics } from '../../data/topics';
import TopicLink from './components/topic-link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col py-6 md:py-10">
      <h1 className="text-xl font-bold md:text-2xl">
        Pick a topic and start learning Spanish
      </h1>
      <div className="mt-6 grid auto-rows-fr grid-cols-2 gap-4 md:mt-8 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
        {topics.map(topic => {
          return <TopicLink key={topic.id} topic={topic} />;
        })}
      </div>
    </main>
  );
}
