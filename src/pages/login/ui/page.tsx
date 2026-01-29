import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { Input } from '@shared/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form'
import { Button } from '@shared/ui/button'
import { useAuthStore } from '@shared/store/auth'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation, getLoginSchema, type LoginFormValue } from '@features/auth'

export function LoginPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const mutation = useLoginMutation()

    const schema = useMemo(() => getLoginSchema((key, opts) => t(key, opts)), [t])
    const form = useForm<LoginFormValue>({
        resolver: zodResolver(schema),
        defaultValues: { email: '', password: '' },
    })

    useEffect(() => {
        if (user) {
            void navigate(RoutePath[AppRoutes.DASHBOARD], { replace: true })
        }
    }, [user, navigate])

    const handleSubmit = form.handleSubmit((values) => {
        mutation.mutate(values, {
            onSuccess: () => {
                void navigate(RoutePath[AppRoutes.DASHBOARD], { replace: true })
                toast.success(t('login.login.success'))
            },
            onError: (err) => {
                const msg = err.message ?? ''
                const isNoBackend =
                    import.meta.env.DEV &&
                    (msg.includes('404') ||
                        msg.includes('Network Error') ||
                        msg.includes('Failed to fetch') ||
                        msg.includes('ERR_NETWORK'))
                if (isNoBackend) {
                    const email = form.getValues('email')
                    useAuthStore
                        .getState()
                        .setAuth({ id: 'dev', email, name: email.split('@')[0] ?? 'User' }, 'dev-token')
                    void navigate(RoutePath[AppRoutes.DASHBOARD], { replace: true })
                    toast.success(t('login.login.success'))
                    return
                }
                toast.error(msg || t('login.login.error'))
            },
        })
    })

    const handleDemoLogin = () => {
        useAuthStore.getState().setAuth({ id: 'demo', email: 'demo@example.com', name: 'Demo User' }, 'demo-token')
        void navigate(RoutePath[AppRoutes.DASHBOARD], { replace: true })
        toast.success(t('login.login.demoSuccess'))
    }

    if (user) {
        return null
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">{t('login.login.title')}</h1>
                    <p className="text-muted-foreground text-sm">{t('login.login.subtitle')}</p>
                    <p className="text-muted-foreground text-xs">{t('login.login.hint')}</p>
                </div>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('login.login.email')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('login.login.password')}</FormLabel>
                                    <FormControl>
                                        <Input type="password" autoComplete="current-password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? t('login.login.submitting') : t('login.login.submit')}
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">{t('login.login.or')}</span>
                            </div>
                        </div>
                        <Button type="button" variant="outline" className="w-full" onClick={handleDemoLogin}>
                            {t('login.login.demoButton')}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
