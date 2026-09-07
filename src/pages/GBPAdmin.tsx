import { FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./gbp-admin.css";

type Account = { name: string; accountName: string };
type Location = { name: string; title: string };
type Review = {
  reviewId: string;
  reviewer?: { displayName?: string };
  starRating: string;
  comment?: string;
  reviewReply?: { comment?: string };
};
type Post = {
  name: string;
  summary: string;
  topicType?: string;
  languageCode?: string;
  media?: { sourceUrl?: string }[];
  callToAction?: { actionType: string; url: string };
};
type Media = {
  name: string;
  description?: string;
  googleUrl?: string;
  mediaFormat: string;
};
type Profile = {
  title?: string;
  websiteUri?: string;
  profile?: { description?: string };
  phoneNumbers?: { primaryPhone?: string; additionalPhones?: string[] };
};
type Page = {
  accounts?: Account[];
  locations?: Location[];
  reviews?: Review[];
  localPosts?: Post[];
  mediaItems?: Media[];
  nextPageToken?: string;
};
const resourceId = (name: string) => name.split("/").pop() || "";

export default function GBPAdmin() {
  const [session, setSession] = useState<{
    email: string;
    csrf: string;
  } | null>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [account, setAccount] = useState("");
  const [location, setLocation] = useState("");
  const [accountNext, setAccountNext] = useState("");
  const [locationNext, setLocationNext] = useState("");
  const [tab, setTab] = useState("profile");
  const [page, setPage] = useState<Page>({});
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState<Profile>({});
  const [reply, setReply] = useState<Record<string, string>>({});
  const [postId, setPostId] = useState("");
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState("en");
  const [photo, setPhoto] = useState("");
  const [cta, setCta] = useState("");
  const [ctaType, setCtaType] = useState("LEARN_MORE");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaFormat, setMediaFormat] = useState("PHOTO");
  const [category, setCategory] = useState("ADDITIONAL");
  const [description, setDescription] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/gbp?action=session", { cache: "no-store" })
      .then(async (r) => {
        const data = await r.json();
        if (!active) return;
        if (r.ok) setSession(data);
        else if (r.status !== 401)
          setError(data.error || "Admin service unavailable.");
      })
      .catch(() => {
        if (active) setError("Admin service is unavailable. Please try again.");
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    if (new URLSearchParams(window.location.search).has("error"))
      setError("Google consent was cancelled. Please sign in again.");
    return () => {
      active = false;
    };
  }, []);

  async function request(
    action: string,
    body?: unknown,
    extra: Record<string, string> = {},
  ) {
    const q = new URLSearchParams({ action, account, location, ...extra });
    const r = await fetch("/api/gbp?" + q, {
      method: body === undefined ? "GET" : "POST",
      cache: "no-store",
      ...(body === undefined
        ? {}
        : {
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": session?.csrf || "",
            },
            body: JSON.stringify(body),
          }),
    });
    const data = await r.json();
    if (!r.ok) {
      if (r.status === 401) setSession(null);
      throw new Error(data.error || "Request failed.");
    }
    return data;
  }
  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed.");
    } finally {
      setBusy(false);
    }
  }
  async function load(token = "") {
    const data = await request(
      tab,
      undefined,
      token ? { pageToken: token } : {},
    );
    if (tab === "profile") setProfile(data);
    else setPage(data);
    setLoaded(true);
  }
  function mutate(
    action: string,
    body: unknown,
    extra: Record<string, string> = {},
  ) {
    if (
      !window.confirm(
        "Apply this change to the selected Google Business Profile? It may become publicly visible.",
      )
    )
      return;
    void run(async () => {
      await request(action, body, extra);
      await load();
      setNotice(
        "Google accepted the change. Publication may require processing or review.",
      );
    });
  }
  const submitProfile = (e: FormEvent) => {
    e.preventDefault();
    mutate("profile-update", {
      title: profile.title,
      websiteUri: profile.websiteUri || "",
      profile: { description: profile.profile?.description || "" },
      ...(profile.phoneNumbers?.primaryPhone
        ? { phoneNumbers: profile.phoneNumbers }
        : {}),
    });
  };
  const resetPost = () => {
    setPostId("");
    setSummary("");
    setPhoto("");
    setCta("");
    setCtaType("LEARN_MORE");
    setLanguage("en");
  };
  const resetSelection = () => {
    setLoaded(false);
    setPage({});
    setReply({});
    resetPost();
  };
  return (
    <main className="gbp-admin">
      <Helmet>
        <title>Business Profile Admin | Anantha</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <header>
        <a href="/">Anantha Real Estate</a>
        <h1>Google Business Profile</h1>
        <p>Manage your business information and customer conversations.</p>
      </header>
      {error && (
        <p role="alert" className="gbp-error">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="gbp-notice">
          {notice}
        </p>
      )}
      {checking ? (
        <p>Checking administrator access…</p>
      ) : !session ? (
        <section>
          <h2>Administrator sign-in</h2>
          <p>
            Use an approved Google account that manages your business profile.
          </p>
          <a className="gbp-button" href="/api/gbp?action=login">
            Sign in with Google
          </a>
          <p>
            <small>
              Only accounts approved by the site administrator can access this
              area.
            </small>
          </p>
        </section>
      ) : (
        <>
          <section className="gbp-toolbar">
            <span>Signed in as {session.email}</span>
            <button
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  await request("logout", {});
                  setSession(null);
                  resetSelection();
                })
              }
            >
              Sign out
            </button>
            <button
              disabled={busy}
              onClick={() => {
                if (
                  window.confirm(
                    "Revoke this app’s Google access and remove its stored tokens?",
                  )
                )
                  void run(async () => {
                    await request("disconnect", {});
                    setSession(null);
                    resetSelection();
                  });
              }}
            >
              Disconnect Google
            </button>
          </section>
          <fieldset disabled={busy}>
            <section>
              <h2>Select a business</h2>
              <button
                onClick={() =>
                  void run(async () => {
                    const data = await request("accounts");
                    setAccounts(data.accounts || []);
                    setAccountNext(data.nextPageToken || "");
                    if (!data.accounts?.length)
                      setNotice(
                        "No accessible business accounts were returned.",
                      );
                  })
                }
              >
                Discover accounts
              </button>
              <label>
                Account
                <select
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value);
                    setLocation("");
                    setLocations([]);
                    setLocationNext("");
                    resetSelection();
                  }}
                >
                  <option value="">Choose an account</option>
                  {accounts.map((a) => (
                    <option key={a.name} value={resourceId(a.name)}>
                      {a.accountName || a.name}
                    </option>
                  ))}
                </select>
              </label>
              {accountNext && (
                <button
                  onClick={() =>
                    void run(async () => {
                      const d = await request("accounts", undefined, {
                        pageToken: accountNext,
                      });
                      setAccounts((a) => [...a, ...(d.accounts || [])]);
                      setAccountNext(d.nextPageToken || "");
                    })
                  }
                >
                  More accounts
                </button>
              )}
              <button
                disabled={!account}
                onClick={() =>
                  void run(async () => {
                    const d = await request("locations");
                    setLocations(d.locations || []);
                    setLocationNext(d.nextPageToken || "");
                    if (!d.locations?.length)
                      setNotice("No locations were returned for this account.");
                  })
                }
              >
                Discover locations
              </button>
              <label>
                Location
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    resetSelection();
                  }}
                >
                  <option value="">Choose a location</option>
                  {locations.map((l) => (
                    <option key={l.name} value={resourceId(l.name)}>
                      {l.title}
                    </option>
                  ))}
                </select>
              </label>
              {locationNext && (
                <button
                  onClick={() =>
                    void run(async () => {
                      const d = await request("locations", undefined, {
                        pageToken: locationNext,
                      });
                      setLocations((l) => [...l, ...(d.locations || [])]);
                      setLocationNext(d.nextPageToken || "");
                    })
                  }
                >
                  More locations
                </button>
              )}
            </section>
            {location && (
              <section>
                <nav aria-label="Profile management">
                  {["profile", "reviews", "posts", "media"].map((t) => (
                    <button
                      key={t}
                      aria-pressed={tab === t}
                      onClick={() => {
                        setTab(t);
                        resetSelection();
                      }}
                    >
                      {t[0].toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </nav>
                <button onClick={() => void run(() => load())}>
                  Load {tab}
                </button>
                {!loaded && (
                  <p>Load the selected section to view and manage it.</p>
                )}
                {loaded && tab === "profile" && (
                  <form onSubmit={submitProfile}>
                    <h2>Business information</h2>
                    <label>
                      Business name
                      <input
                        required
                        maxLength={200}
                        value={profile.title || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, title: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Website
                      <input
                        type="url"
                        value={profile.websiteUri || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, websiteUri: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Primary phone
                      <input
                        maxLength={40}
                        value={profile.phoneNumbers?.primaryPhone || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            phoneNumbers: {
                              ...profile.phoneNumbers,
                              primaryPhone: e.target.value,
                            },
                          })
                        }
                      />
                    </label>
                    <label>
                      Description
                      <textarea
                        maxLength={750}
                        value={profile.profile?.description || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            profile: { description: e.target.value },
                          })
                        }
                      />
                    </label>
                    <button type="submit">Review and save profile</button>
                    <details>
                      <summary>Full profile details</summary>
                      <pre>{JSON.stringify(profile, null, 2)}</pre>
                    </details>
                  </form>
                )}
                {loaded && tab === "reviews" && (
                  <>
                    <h2>Customer reviews</h2>
                    {!page.reviews?.length && <p>No reviews on this page.</p>}
                    {page.reviews?.map((r) => (
                      <article key={r.reviewId}>
                        <h3>
                          {r.reviewer?.displayName || "Google customer"} ·{" "}
                          {r.starRating}
                        </h3>
                        <p>{r.comment || "Rating without a comment"}</p>
                        <label>
                          Your reply
                          <textarea
                            maxLength={4096}
                            value={
                              reply[r.reviewId] ?? r.reviewReply?.comment ?? ""
                            }
                            onChange={(e) =>
                              setReply({
                                ...reply,
                                [r.reviewId]: e.target.value,
                              })
                            }
                          />
                        </label>
                        <button
                          disabled={
                            !(
                              reply[r.reviewId] ??
                              r.reviewReply?.comment ??
                              ""
                            ).trim()
                          }
                          onClick={() =>
                            mutate(
                              "reply",
                              {
                                comment:
                                  reply[r.reviewId] ?? r.reviewReply?.comment,
                              },
                              { review: r.reviewId },
                            )
                          }
                        >
                          Publish reply
                        </button>
                        {r.reviewReply && (
                          <button
                            onClick={() =>
                              mutate("reply-delete", {}, { review: r.reviewId })
                            }
                          >
                            Delete reply
                          </button>
                        )}
                      </article>
                    ))}
                  </>
                )}
                {loaded && tab === "posts" && (
                  <>
                    <h2>Business updates</h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        mutate(
                          postId ? "post-update" : "post-create",
                          {
                            summary,
                            languageCode: language,
                            topicType: "STANDARD",
                            ...(photo
                              ? {
                                  media: [
                                    { mediaFormat: "PHOTO", sourceUrl: photo },
                                  ],
                                }
                              : {}),
                            ...(cta
                              ? {
                                  callToAction: {
                                    actionType: ctaType,
                                    url: cta,
                                  },
                                }
                              : {}),
                          },
                          postId ? { post: postId } : {},
                        );
                      }}
                    >
                      <h3>{postId ? "Edit update" : "Create update"}</h3>
                      <label>
                        Text
                        <textarea
                          required
                          maxLength={1500}
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                        />
                      </label>
                      <label>
                        Language code
                        <input
                          required
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        />
                      </label>
                      <label>
                        Photo URL (optional, public HTTPS)
                        <input
                          type="url"
                          value={photo}
                          onChange={(e) => setPhoto(e.target.value)}
                        />
                      </label>
                      <label>
                        Button
                        <select
                          value={ctaType}
                          onChange={(e) => setCtaType(e.target.value)}
                        >
                          {[
                            "LEARN_MORE",
                            "BOOK",
                            "ORDER",
                            "SHOP",
                            "SIGN_UP",
                          ].map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Button destination (optional)
                        <input
                          type="url"
                          value={cta}
                          onChange={(e) => setCta(e.target.value)}
                        />
                      </label>
                      <button type="submit">
                        {postId ? "Save update" : "Publish update"}
                      </button>
                      {postId && (
                        <button type="button" onClick={resetPost}>
                          Cancel editing
                        </button>
                      )}
                    </form>
                    {!page.localPosts?.length && <p>No posts on this page.</p>}
                    {page.localPosts?.map((p) => (
                      <article key={p.name}>
                        <p>{p.summary}</p>
                        <small>{p.topicType}</small>
                        <div>
                          {p.topicType === "STANDARD" && (
                            <button
                              onClick={() => {
                                setPostId(resourceId(p.name));
                                setSummary(p.summary);
                                setLanguage(p.languageCode || "en");
                                setPhoto(p.media?.[0]?.sourceUrl || "");
                                setCta(p.callToAction?.url || "");
                                setCtaType(
                                  p.callToAction?.actionType || "LEARN_MORE",
                                );
                              }}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() =>
                              mutate(
                                "post-delete",
                                {},
                                { post: resourceId(p.name) },
                              )
                            }
                          >
                            Delete post
                          </button>
                        </div>
                      </article>
                    ))}
                  </>
                )}
                {loaded && tab === "media" && (
                  <>
                    <h2>Photos and videos</h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        mutate("media-create", {
                          mediaFormat,
                          sourceUrl: mediaUrl,
                          locationAssociation: { category },
                          description,
                        });
                      }}
                    >
                      <p>
                        Add media from a publicly accessible HTTPS URL. Google
                        retrieves and processes the file.
                      </p>
                      <label>
                        Media URL
                        <input
                          required
                          type="url"
                          value={mediaUrl}
                          onChange={(e) => setMediaUrl(e.target.value)}
                        />
                      </label>
                      <label>
                        Format
                        <select
                          value={mediaFormat}
                          onChange={(e) => setMediaFormat(e.target.value)}
                        >
                          <option>PHOTO</option>
                          <option>VIDEO</option>
                        </select>
                      </label>
                      <label>
                        Category
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {[
                            "ADDITIONAL",
                            "COVER",
                            "PROFILE",
                            "EXTERIOR",
                            "INTERIOR",
                            "PRODUCT",
                            "AT_WORK",
                          ].map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Description
                        <textarea
                          maxLength={1000}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </label>
                      <button type="submit">Add media</button>
                    </form>
                    {!page.mediaItems?.length && <p>No media on this page.</p>}
                    {page.mediaItems?.map((m) => (
                      <article key={m.name}>
                        <p>{m.description || m.mediaFormat}</p>
                        {m.googleUrl?.startsWith("https://") && (
                          <a
                            href={m.googleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View media
                          </a>
                        )}
                        <button
                          onClick={() =>
                            mutate(
                              "media-delete",
                              {},
                              { media: resourceId(m.name) },
                            )
                          }
                        >
                          Delete media
                        </button>
                      </article>
                    ))}
                  </>
                )}
                {loaded && page.nextPageToken && tab !== "profile" && (
                  <button
                    onClick={() => void run(() => load(page.nextPageToken))}
                  >
                    Next page
                  </button>
                )}
              </section>
            )}
          </fieldset>
          {busy && <p role="status">Working…</p>}
        </>
      )}
    </main>
  );
}
