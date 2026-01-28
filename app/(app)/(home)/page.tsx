import { topics } from '../../data/topics';
import TopicLink from './components/topic-link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col py-6 md:py-10">
      <h1 className="text-xl font-bold md:text-2xl dark:text-neutral-50">
        Pick a topic and start learning Spanish
      </h1>

      <ul className="m-0 mt-6 grid list-none auto-rows-fr grid-cols-2 gap-4 p-0 md:mt-8 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
        {topics.map(topic => (
          <li key={topic.id} className="h-full">
            <TopicLink topic={topic} />
          </li>
        ))}
      </ul>
    </main>
  );
}
