import ChangePasswordForm from "@/src/components/security/ChangePasswordForm";

export default function SecurityPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Security Settings
      </h1>

      <p className="mt-2 text-gray-400">
        Update your account password.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900/50 p-8">

        <h2 className="mb-6 text-2xl font-bold">
          Change Password
        </h2>

        <ChangePasswordForm />

      </div>

    </div>
  );
}
