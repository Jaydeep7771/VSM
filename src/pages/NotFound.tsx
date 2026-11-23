import { ButtonLink, Eyebrow } from '../components/Primitives';

export default function NotFound() {
  return (
    <section className="shell flex max-w-[60rem] flex-col items-start py-[clamp(6rem,14vw,12rem)]">
      <Eyebrow>404</Eyebrow>
      <h1 className="display mt-7 mb-7 text-[clamp(2.5rem,6vw,5rem)]">
        This page has been moved.
      </h1>
      <p className="body-copy mb-10 max-w-[44ch] text-base">
        The address you followed no longer exists. Our work, services and process are all a click
        away.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink to="/">Back to home</ButtonLink>
        <ButtonLink to="/portfolio" variant="outline">
          View the work
        </ButtonLink>
      </div>
    </section>
  );
}
