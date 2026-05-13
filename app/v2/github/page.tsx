import GithubContributions from "@/components/custom/GithubContributions";
import { unstable_cache } from "next/cache";

const username = "divyashriravichandran";

const getCachedContributions = unstable_cache(
  async () => {
    const url = new URL(
      `https://github-contributions-api.jogruber.de/v4/${username}`,
    );
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch GitHub data");

    const data = await response.json();
    const currentYear = new Date().getFullYear();

    // Filter contributions for the current year only
    const contributions = data.contributions.filter((c: any) =>
      c.date.startsWith(currentYear.toString()),
    );

    return {
      contributions,
      total: data.total[currentYear],
    };
  },
  ["github-contributions"],
  { revalidate: 60 * 60 * 24 },
);

export default async function Page() {
  const { contributions, total } = await getCachedContributions();

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">{total} contributions in 2026</h2>
      <GithubContributions githubData={contributions} />
    </div>
  );
}
