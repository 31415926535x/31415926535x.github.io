---
title: csp刷题
date: 2018-12-13 16:41:33
tags:
---
csp刷题留存：

<!-- more -->


# [Markdown](http://118.190.20.162/view.page?gpid=T55)

在第7个点挂了，，，不改了，，，太恶心了这种题QAQ，，，，
有谁想改的改完了告诉我一下，，，QAQ
```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e3 + 5;
string h1[] = { "<h1>" , "<h2>" , "<h3>" , "<h4>" , "<h5>" , "<h6>" };
string h2[] = { "</h1>" , "</h2>" , "</h3>" , "</h4>" , "</h5>" , "</h6>" };
void check(string s)
{
    int pos = 0;
    bool _ = false;
    bool href = false;
    while(s[pos] != '\0')
    {
        if(s[pos] == '_')
        {
            cout << "<em>";
            int pos2 = pos + 1;
            while(s[pos2] != '_')++pos2;
            string t = s.substr(pos + 1 , pos2 - pos - 1);
            check(t);
            cout << "</em>";
            pos = pos2 + 1;
        }
        else if(s[pos] == '[')
        {
            int a , b , c , d;
            a = b = c = d = pos;
            for(int i = pos; s[i] != '\0'; ++i)
            {
                if(s[i] == ']')
                    b = i;
                if(s[i] == '(')
                    c = i;
                if(s[i] == ')')
                    d = i;
            }
            if(b != pos && c != pos && d != pos)
            {
                cout << "<a href=\"";
                string t = s.substr(c + 1 , d - c - 1);
                check(t);
                cout << "\">";
                t = s.substr(a + 1 , b - a - 1);
                check(t);
                cout << "</a>";
                pos = d + 1;
            }
            else
                cout << s[pos++];
        }
        else
            cout << s[pos++];
    }
}
int main()
{
    freopen("233.txt" , "r" , stdin);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    string s;
    bool flagul = false;
    bool flagp = false;
    while(getline(cin , s))
    {
        if(s[0] == '#')
        {

            if(flagul)
            {
                cout << "</ul>" << endl;
                flagul = false;
            }
            if(flagp)
            {
                cout << "</p>" << endl;
                flagp = false;
            }

            int i;int sum = 0;
            for(i = 0; i <= 5; ++i)
            {
                if(s[i] == '#')
                    ++sum;
                else
                    break;
            }
            int pos = i;
            while(s[pos] == ' ')++pos;
            cout << h1[sum - 1];
            string t = s.substr(pos , s.length() - pos);
            check(t);
            cout << h2[sum - 1] << endl;
        }
        else if(s[0] == '*')
        {

            if(flagp)
            {
                cout << "</p>" << endl;
                flagp = false;
            }

            if(!flagul)
            {
                cout << "<ul>" << endl;
                flagul = true;
            }
            int i;
            int pos = 0;
            for(int i = 0; s[i] != '\0'; ++i)
                if(s[i] == ' ' || s[i] == '*')
                    ++pos;
            cout << "<li>";
            while(s[pos] != '\0')
                cout << s[pos++];
            cout << "</li>" << endl;
        }
        else if(s.length() == 0)
        {
            if(flagp)
            {
                cout << "</p>" << endl;
                flagp = false;
            }
            continue;
        }

        else
        {
            if(flagul)
            {
                cout << "</ul>" << endl;
                flagul = false;
            }

            if(!flagp)
            {
                cout << "<p>";
                flagp = true;
                check(s);
                continue;
            }
            cout << endl;
            check(s);
        }
    }
    if(flagp)
        cout << "</p>";
    if(flagul)
        cout << "</ul>";
    return 0;
}

```

# [线性递推式](http://118.190.20.162/view.page?gpid=T74)

暴力肯定超时，，，试了试杜教筛，，，然后wa2，，，emmmm有毒，，，不管了++

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e5 + 10;
const int mod = 998244353;
typedef long long ll;

#define rep(i,a,n) for (int i=a;i<n;i++)
#define per(i,a,n) for (int i=n-1;i>=a;i--)
#define pb push_back
#define mp make_pair
#define all(x) (x).begin(),(x).end()
#define fi first
#define se second
#define SZ(x) ((int)(x).size())
typedef vector<int> VI;
typedef pair<int,int> PII;
ll powmod(ll a,ll b) {ll res=1;a%=mod; assert(b>=0); for(;b;b>>=1){if(b&1)res=res*a%mod;a=a*a%mod;}return res;}
// head

int _,n;
namespace linear_seq {
    const int N=10010;
    ll res[N],base[N],_c[N],_md[N];

    vector<int> Md;
    void mul(ll *a,ll *b,int k) {
        rep(i,0,k+k) _c[i]=0;
        rep(i,0,k) if (a[i]) rep(j,0,k) _c[i+j]=(_c[i+j]+a[i]*b[j])%mod;
        for (int i=k+k-1;i>=k;i--) if (_c[i])
            rep(j,0,SZ(Md)) _c[i-k+Md[j]]=(_c[i-k+Md[j]]-_c[i]*_md[Md[j]])%mod;
        rep(i,0,k) a[i]=_c[i];
    }
    int solve(ll n,VI a,VI b) { // a 系数 b 初值 b[n+1]=a[0]*b[n]+...
//        printf("%d\n",SZ(b));
        ll ans=0,pnt=0;
        int k=SZ(a);
        assert(SZ(a)==SZ(b));
        rep(i,0,k) _md[k-1-i]=-a[i];_md[k]=1;
        Md.clear();
        rep(i,0,k) if (_md[i]!=0) Md.push_back(i);
        rep(i,0,k) res[i]=base[i]=0;
        res[0]=1;
        while ((1ll<<pnt)<=n) pnt++;
        for (int p=pnt;p>=0;p--) {
            mul(res,res,k);
            if ((n>>p)&1) {
                for (int i=k-1;i>=0;i--) res[i+1]=res[i];res[0]=0;
                rep(j,0,SZ(Md)) res[Md[j]]=(res[Md[j]]-res[k]*_md[Md[j]])%mod;
            }
        }
        rep(i,0,k) ans=(ans+res[i]*b[i])%mod;
        if (ans<0) ans+=mod;
        return ans;
    }
    VI BM(VI s) {
        VI C(1,1),B(1,1);
        int L=0,m=1,b=1;
        rep(n,0,SZ(s)) {
            ll d=0;
            rep(i,0,L+1) d=(d+(ll)C[i]*s[n-i])%mod;
            if (d==0) ++m;
            else if (2*L<=n) {
                VI T=C;
                ll c=mod-d*powmod(b,mod-2)%mod;
                while (SZ(C)<SZ(B)+m) C.pb(0);
                rep(i,0,SZ(B)) C[i+m]=(C[i+m]+c*B[i])%mod;
                L=n+1-L; B=T; b=d; m=1;
            } else {
                ll c=mod-d*powmod(b,mod-2)%mod;
                while (SZ(C)<SZ(B)+m) C.pb(0);
                rep(i,0,SZ(B)) C[i+m]=(C[i+m]+c*B[i])%mod;
                ++m;
            }
        }
        return C;
    }
    int gao(VI a,ll n) {
        VI c=BM(a);
        c.erase(c.begin());
        rep(i,0,SZ(c)) c[i]=(mod-c[i])%mod;
        return solve(n,c,VI(a.begin(),a.begin()+SZ(c)));
    }
};

int main()
{
    //freopen("233.txt" , "r" , stdin);
    ll a[maxn];
    ll k[maxn];
    ll m , l , r;
    scanf("%lld%lld%lld" , &m , &l , &r);
    {
        for(ll i = 1; i <= m; ++i)
            scanf("%lld" , &k[i]);
        memset(a , (ll)0 , sizeof a);
        a[0] = (ll)1;


        if(r >= 20)
        {
            for(ll i = 1; i <= 30; ++i)
            {
                ll mi = min(i, m);
                ll ma = (m <= i) ? m : i;
                for(ll j = i, kk = 1; kk <= ma; --j, ++kk)
                    a[i] = (a[i] + (a[j - 1] * k[kk] % mod)) % mod;
            }
            vector<int> v;
            for(ll i = 1; i <= 30; ++i)
                v.push_back(a[i]);
            for(ll i = l; i <= r; ++i)
                printf("%lld\n", linear_seq::gao(v, i - 1));
        }
        else
        {
            for(ll i = 1; i <= r; ++i)
            {
                int mi = min(i, m);
                int ma = (m <= i) ? m : i;
                for(ll j = i, kk = 1; kk <= ma; --j, ++kk)
                    a[i] = (a[i] + (a[j - 1] * k[kk] % mod)) % mod;
            }
            for(int i = l; i <= r; ++i)
            printf("%lld\n" , a[i]);
        }
    }
    return 0;
}

```


# [通信网络](http://118.190.20.162/view.page?gpid=T60)

这题深搜就行了，，，代码丢了，，，

# [除法](http://118.190.20.162/view.page?gpid=T59)

这题给的时限是10s，，，一开始我还当一般的区间问题想，，，想着怎么用区间修改的线段树做，，，，然后发现时限很大，之后果断暴力更新区间的每个点，，，然后试了好多的线段树的板子都在第九个点t了，，，，换树状数组就没事，，emmmmm有毒++,,还有要判断这个数是不是已经比要除的数小，，，还有标记优化，，，这样才能过，，，，

代码没保存，，，emmmm不管了，，，，
