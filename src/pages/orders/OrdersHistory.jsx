import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { getUserOrders } from "../../api/orders"
import { FaArrowRight, FaShoppingBag } from "react-icons/fa"
import AuthRequired from "../../components/AuthRequired"
import { getOrderStatus } from "../../utils/orderStatus"
import styles from './OrdersHistory.module.css'

export default function OrdersHistory() {
  const { user, authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(user.id)
        setOrders(data)
      } catch (err) {
        console.error("Erreur lors de la récupération des commandes :", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  if (authLoading) return null
  if (!user) return <AuthRequired />

  return (
    <>
      <div className={styles.ohRoot}>
        <div className={styles.ohInner}>

          <div className={styles.ohHeader}>
            <h1 className={styles.ohTitle}>Mes commandes</h1>
            {!loading && orders.length > 0 && (
              <p className={styles.ohSubtitle}>{orders.length} commande{orders.length > 1 ? "s" : ""} passée{orders.length > 1 ? "s" : ""}</p>
            )}
          </div>

          {loading ? (
            [1, 2, 3].map(i => <div key={i} className={styles.ohSkeleton} />)
          ) : orders.length === 0 ? (
            <div className={styles.ohEmpty}>
              <div className={styles.ohEmptyIcon}>
                <FaShoppingBag size={22} />
              </div>
              <p className={styles.ohEmptyTitle}>Aucune commande</p>
              <p className={styles.ohEmptySub}>Vous n'avez pas encore passé de commande.</p>
              <Link to="/" className={styles.ohEmptyBtn}>
                Voir la boutique →
              </Link>
            </div>
          ) : (
            orders.map(order => {
              const status = getOrderStatus(order.status)
              return (
                <Link key={order.id} to={`/order/${order.id}`} className={styles.ohCard}>

                  <div className={styles.ohCardIcon}>
                    <FaShoppingBag size={18} />
                  </div>

                  <div className={styles.ohCardInfo}>
                    <div className={styles.ohCardTop}>
                      <span className={styles.ohCardId}>Commande #{order.id}</span>
                      <span
                        className={styles.ohStatusBadge}
                        style={{ background: status.bg, color: status.color, borderColor: status.border }}
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className={styles.ohCardMeta}>
                      <span className={styles.ohCardMetaItem}>
                        {new Date(order.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </span>
                      <span className={styles.ohCardMetaSep}>·</span>
                      <span className={styles.ohCardAmount}>
                        {(order.total_amount_in_cents / 100).toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  <FaArrowRight size={13} className={styles.ohCardArrow} />
                </Link>
              )
            })
          )}

        </div>
      </div>
    </>
  )
}